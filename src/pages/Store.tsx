import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Lock } from "lucide-react";

interface StoreItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isLocked: boolean;
  category: 'theme' | 'challengePack' | 'feature';
}

const storeItems: StoreItem[] = [
  {
    id: "neon-theme",
    name: "Neon Theme",
    description: "A vibrant, glowing theme for your game",
    price: 99,
    isLocked: true,
    category: 'theme'
  },
  {
    id: "party-pack-1",
    name: "Party Pack Vol. 1",
    description: "50 new exciting party challenges",
    price: 199,
    isLocked: true,
    category: 'challengePack'
  },
  {
    id: "custom-dice",
    name: "Custom Dice Skins",
    description: "Personalize your dice with unique designs",
    price: 149,
    isLocked: true,
    category: 'feature'
  }
];

const Store = () => {
  const handlePurchase = (item: StoreItem) => {
    // In a real app, this would connect to a payment processor
    toast.info(
      <div className="space-y-2">
        <p>This is a demo store.</p>
        <p>In a real app, this would process payment for:</p>
        <p className="font-bold">{item.name} (${item.price / 100})</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-brutal-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Link Back to Home */}
        <div className="mb-4">
          <Link to="/">
            <Button
              variant="ghost" // Use a variant that blends well with your design
              className="text-brutal-pink border-2 border-brutal-black hover:bg-brutal-pink hover:text-white transition-colors"
            >
              ← Back to Home
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          {/* Responsive Header */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-brutal-black">
            Party<span className="text-brutal-pink">Dice</span>
            <span className="text-brutal-black block sm:inline whitespace-nowrap">
              Store<span className="text-brutal-yellow">!</span>
            </span>
          </h1>
          <p className="text-lg mt-2 text-muted-foreground">
            Enhance your PartyDice experience with new themes and challenge packs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeItems.map((item) => (
            <Card key={item.id} className="border-4 border-brutal-black shadow-brutal flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {item.name}
                  {item.isLocked && <Lock className="h-4 w-4" />}
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardContent className="pt-0">
                <p className="text-2xl font-bold">${item.price / 100}</p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => handlePurchase(item)}
                  className="w-full bg-brutal-pink text-white border-4 border-brutal-black font-bold 
                    shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 
                    hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  Purchase
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Store;
