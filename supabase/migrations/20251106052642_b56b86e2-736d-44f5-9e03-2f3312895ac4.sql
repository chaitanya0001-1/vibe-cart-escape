-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow everyone to read products (public catalog)
CREATE POLICY "Anyone can view products"
ON public.products FOR SELECT
USING (true);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on cart_items
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Users can only see their own cart items
CREATE POLICY "Users can view own cart items"
ON public.cart_items FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own cart items
CREATE POLICY "Users can insert own cart items"
ON public.cart_items FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own cart items
CREATE POLICY "Users can update own cart items"
ON public.cart_items FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own cart items
CREATE POLICY "Users can delete own cart items"
ON public.cart_items FOR DELETE
USING (auth.uid() = user_id);

-- Create orders table for checkout history
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  order_items JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
ON public.orders FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own orders
CREATE POLICY "Users can insert own orders"
ON public.orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Insert sample products
INSERT INTO public.products (name, description, price, stock, image_url) VALUES
('Wireless Headphones', 'Premium noise-cancelling headphones with 30-hour battery life', 149.99, 50, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'),
('Smart Watch', 'Fitness tracker with heart rate monitor and GPS', 299.99, 30, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'),
('Laptop Stand', 'Ergonomic aluminum laptop stand with adjustable height', 49.99, 100, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400'),
('Mechanical Keyboard', 'RGB backlit gaming keyboard with blue switches', 89.99, 45, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400'),
('Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 39.99, 75, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400'),
('USB-C Hub', '7-in-1 USB-C hub with HDMI, SD card reader, and USB ports', 59.99, 60, 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400'),
('Phone Case', 'Durable protective case with card holder', 24.99, 200, 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400'),
('Portable Charger', '20000mAh power bank with fast charging', 34.99, 80, 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400'),
('Bluetooth Speaker', 'Waterproof portable speaker with 360° sound', 79.99, 55, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400'),
('Camera Lens', 'Wide-angle lens for smartphone photography', 44.99, 40, 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400');