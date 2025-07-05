
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Github, Chrome, Facebook, CheckCircle, Users, Clock } from "lucide-react";

export const AuthPage = () => {
  const { signIn, isLoading } = useAuth();

  const handleSocialLogin = async (provider: string) => {
    await signIn(provider);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <div className="text-center md:text-left space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Manage Tasks
              <span className="block text-indigo-600">Together</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Collaborate on tasks in real-time, share projects with your team, and stay organized with powerful filtering and priority management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-500" />
              <span className="text-sm font-medium">Real-time Updates</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
              <Users className="h-6 w-6 text-blue-500" />
              <span className="text-sm font-medium">Team Collaboration</span>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-white/50 rounded-lg">
              <Clock className="h-6 w-6 text-purple-500" />
              <span className="text-sm font-medium">Smart Filtering</span>
            </div>
          </div>
        </div>

        {/* Right side - Auth card */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
            <CardDescription className="text-gray-600">
              Sign in with your preferred social account to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading}
              className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 shadow-sm"
              size="lg"
            >
              <Chrome className="mr-3 h-5 w-5 text-red-500" />
              Continue with Google
            </Button>

            <Button
              onClick={() => handleSocialLogin('github')}
              disabled={isLoading}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white"
              size="lg"
            >
              <Github className="mr-3 h-5 w-5" />
              Continue with GitHub
            </Button>

            <Button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              <Facebook className="mr-3 h-5 w-5" />
              Continue with Facebook
            </Button>

            <div className="pt-4 text-center">
              <p className="text-xs text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
