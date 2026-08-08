"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff, User, Mail, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuthStore } from "@/lib/auth/store";
import { getErrorMessage } from "@/lib/api/client";

export function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const user = await register(form.name, form.email, form.password);

      toast.success(`Account created. Welcome, ${user.name}!`);

      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/50 bg-card/60 backdrop-blur-xl shadow-lg rounded-3xl overflow-hidden">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="font-display text-2xl font-bold tracking-tight">
          Create an account
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Enter your details below to get started with your dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="@John Doe"
                autoComplete="name"
                required
                className="pl-10 h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="pl-10 h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Minimum 8 characters"
                autoComplete="new-password"
                required
                className="pl-10 pr-10 h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                placeholder="Re-enter password"
                autoComplete="new-password"
                required
                className="pl-10 pr-10 h-11 rounded-xl bg-background/50 border-border/80 focus-visible:ring-1 focus-visible:ring-primary transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-11 rounded-xl font-medium shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 mt-2"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline underline-offset-4 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
