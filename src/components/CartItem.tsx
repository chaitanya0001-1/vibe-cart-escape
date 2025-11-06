import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface CartItemProps {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export const CartItem = ({ id, productId, name, price, quantity, imageUrl }: CartItemProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", id);

    if (error) {
      toast({ title: "Error updating quantity", variant: "destructive" });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    queryClient.invalidateQueries({ queryKey: ["cart-count"] });
  };

  const removeItem = async () => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error removing item", variant: "destructive" });
      return;
    }

    queryClient.invalidateQueries({ queryKey: ["cart-items"] });
    queryClient.invalidateQueries({ queryKey: ["cart-count"] });
    toast({ title: "Item removed from cart" });
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <img 
          src={imageUrl} 
          alt={name}
          className="h-24 w-24 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-lg font-bold text-primary mt-1">${price.toFixed(2)}</p>
          
          <div className="flex items-center gap-2 mt-3">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => updateQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => updateQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="destructive" 
              onClick={removeItem}
              className="ml-auto"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Subtotal</p>
          <p className="text-xl font-bold">${(price * quantity).toFixed(2)}</p>
        </div>
      </div>
    </Card>
  );
};
