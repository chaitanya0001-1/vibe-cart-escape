import { ShoppingCart, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

export const ProductCard = ({ id, name, description, price, imageUrl, stock }: ProductCardProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleAddToCart = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      toast({
        title: "Please login",
        description: "You need to be logged in to add items to cart",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const { data: existing } = await supabase
      .from("cart_items")
      .select()
      .eq("user_id", session.user.id)
      .eq("product_id", id)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + 1 })
        .eq("id", existing.id);

      if (error) {
        toast({ title: "Error updating cart", variant: "destructive" });
        return;
      }
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({ user_id: session.user.id, product_id: id, quantity: 1 });

      if (error) {
        toast({ title: "Error adding to cart", variant: "destructive" });
        return;
      }
    }

    queryClient.invalidateQueries({ queryKey: ["cart-count"] });
    toast({ title: "Added to cart!" });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={imageUrl} 
          alt={name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-primary">${price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground mt-1">{stock} in stock</p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleAddToCart} 
          disabled={stock === 0}
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
