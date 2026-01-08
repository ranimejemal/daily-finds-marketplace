import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, Heart, MapPin, Settings, LogOut, ChevronRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Account: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <User className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Sign in to view your account</h1>
            <p className="text-muted-foreground mb-6">Access your orders, favorites, and settings</p>
            <div className="flex gap-4 justify-center">
              <Link to="/login">
                <Button variant="fresh">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button variant="outline">Create Account</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
    navigate('/');
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        <div className="border-b border-border">
          <div className="container-wide py-4">
            <nav className="text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">My Account</span>
            </nav>
          </div>
        </div>

        <div className="container-wide py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-card rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-display font-bold text-xl">
                      {user.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Welcome back!</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>

                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-fresh-light text-primary'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </nav>

                <Button
                  variant="ghost"
                  className="w-full mt-4 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeTab === 'profile' && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="font-display text-xl font-bold mb-6">Profile Information</h2>
                  <form className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user.email || ''} disabled />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>
                    <Button type="submit" variant="fresh">Save Changes</Button>
                  </form>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="font-display text-xl font-bold mb-6">Order History</h2>
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                    <Link to="/products">
                      <Button variant="fresh">Start Shopping</Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="font-display text-xl font-bold mb-6">My Favorites</h2>
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No favorites yet. Browse products and save your favorites!</p>
                    <Link to="/products">
                      <Button variant="fresh">Browse Products</Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-xl font-bold">Saved Addresses</h2>
                    <Button variant="outline">Add New Address</Button>
                  </div>
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No addresses saved yet</p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-card rounded-xl p-6 shadow-card">
                  <h2 className="font-display text-xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive order updates and promotions</p>
                      </div>
                      <input type="checkbox" className="h-5 w-5" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">SMS Notifications</p>
                        <p className="text-sm text-muted-foreground">Get delivery updates via text</p>
                      </div>
                      <input type="checkbox" className="h-5 w-5" />
                    </div>
                    <Button variant="destructive" className="mt-4">
                      Delete Account
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
