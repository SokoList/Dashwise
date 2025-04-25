"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-slate-500">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input id="first-name" defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" defaultValue="Johnson" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex@example.com" />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Usage</CardTitle>
              <CardDescription>Current plan and usage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Plan</span>
                    <span className="text-blue-600 font-medium">Beta Access</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Analyses Used</span>
                    <span>3 of ∞</span>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="text-sm font-medium mb-1">Beta Features</div>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited analyses</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>AI-powered insights</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <svg className="h-3.5 w-3.5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Early access to new features</span>
                    </li>
                  </ul>
                </div>

                <Button variant="outline">Upgrade Plan</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Beta Access</p>
                      <p className="text-sm text-slate-500">Free during beta period</p>
                    </div>
                    <div className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">Current Plan</div>
                  </div>
                </div>

                <div className="rounded-lg border border-dashed p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Pro Plan</p>
                      <p className="text-sm text-slate-500">$19/month - Coming soon</p>
                    </div>
                    <Button variant="outline" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-slate-500">Receive email updates about your analyses</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200">
                    <span className="absolute h-4 w-4 rounded-full bg-white translate-x-1"></span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Product Updates</p>
                    <p className="text-sm text-slate-500">Receive updates about new features</p>
                  </div>
                  <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                    <span className="absolute h-4 w-4 rounded-full bg-white translate-x-6"></span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
