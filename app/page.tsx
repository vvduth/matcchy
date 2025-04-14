import { auth, signOut } from "@/auth";
import ClientSession from "@/components/ClientSession";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FaHeart, FaSearch, FaUserFriends } from "react-icons/fa";
import { GiMatchTip } from "react-icons/gi";

export default async function Home() {
  const session = await auth();
  return (
    <div className="">
    {/* Hero Section */}
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left side - Content */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center mb-6">
            <GiMatchTip className="text-secondary-500" size={40} />
            <h1 className="text-4xl md:text-5xl font-bold ml-3">matchyy</h1>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Find Your Perfect Match <br />
            <span className="text-secondary-500">Where Connections Happen</span>
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Join thousands of singles who are discovering meaningful connections every day. Your journey to love starts here.
          </p>
          
          <div className="pt-6 flex flex-col sm:flex-row gap-4">
            {session ? (
              <Button
                as={Link}
                href="/members"
                size="lg"
                color="secondary"
                variant="solid"
                className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-full font-medium text-lg transition-all"
              >
                Explore Matches
              </Button>
            ) : (
              <>
                <Button
                  as={Link}
                  href="/register"
                  size="lg"
                  color="secondary"
                  variant="solid"
                  className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-3 rounded-full font-medium text-lg transition-all"
                >
                  Get Started
                </Button>
                
                <Button
                  as={Link}
                  href="/login"
                  size="lg"
                  color="secondary"
                  variant="bordered"
                  className="border-2 border-secondary-500 text-secondary-500 hover:bg-secondary-50 px-8 py-3 rounded-full font-medium text-lg transition-all"
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Right side - Image */}
        <div className="flex-1 rounded-xl overflow-hidden shadow-2xl">
          <div className="relative h-96 w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-purple-600 rounded-xl flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl text-white text-center">
                <div className="flex justify-center mb-4">
                  <GiMatchTip size={60} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Your Perfect Match Awaits</h3>
                <p className="text-white/80">Join matchyy today and find meaningful connections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Features Section */}
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose <span className="text-secondary-500">matchyy</span>?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <FaSearch size={32} className="text-secondary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Matching</h3>
            <p className="text-gray-600">Our advanced algorithm finds compatible matches based on your preferences and personality.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <FaHeart size={32} className="text-secondary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Meaningful Connections</h3>
            <p className="text-gray-600">Focus on quality interactions that lead to lasting relationships.</p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-all">
            <div className="flex justify-center mb-4">
              <FaUserFriends size={32} className="text-secondary-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Safe Community</h3>
            <p className="text-gray-600">Verified profiles and enhanced privacy features to ensure a secure dating experience.</p>
          </div>
        </div>
      </div>
    </div>
    
    {/* CTA Section */}
    <div className="bg-gradient-to-r from-secondary-500 to-purple-600 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Find Your Match?</h2>
        <p className="text-xl mb-8 max-w-lg mx-auto">Join thousands of singles already on matchyy and start your journey today.</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {session ? (
            <Button
              as={Link}
              href="/members"
              size="lg"
              color="secondary"
              variant="solid"
              className="bg-white text-secondary-500 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg transition-all"
            >
              Explore Now
            </Button>
          ) : (
            <>
              <Button
                as={Link}
                href="/register"
                size="lg"
                color="secondary"
                variant="solid"
                className="bg-white text-secondary-500 hover:bg-gray-100 px-8 py-3 rounded-full font-medium text-lg transition-all"
              >
                Sign Up Free
              </Button>
              
              <Button
                as={Link}
                href="/login"
                size="lg"
                color="secondary"
                variant="bordered"
                className="border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-medium text-lg transition-all"
              >
                Log In
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
    
    
  </div>
  );
}
