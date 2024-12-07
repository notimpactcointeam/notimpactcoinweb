import Layout from "@/components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Ban, Flag, Shield, Users } from 'lucide-react'

export default function AdminPanel() {
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="w-6 h-6" />
          Admin Panel
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>1,234</CardTitle>
              <CardDescription>Total Users</CardDescription>
            </CardHeader>
          </Card>
          <Card className="bg-zinc-800 border-zinc-700">
            <CardHeader>
              <CardTitle>56</CardTitle>
              <CardDescription>Premium Users</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>user123</TableCell>
                  <TableCell>Spam</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm">
                      <Ban className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>player456</TableCell>
                  <TableCell>Cheating</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm">
                      <Ban className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button className="flex flex-col gap-2 h-auto p-4">
            <Users className="w-6 h-6" />
            Manage Users
          </Button>
          <Button className="flex flex-col gap-2 h-auto p-4">
            <Flag className="w-6 h-6" />
            View Reports
          </Button>
        </div>
      </div>
    </Layout>
  )
}

