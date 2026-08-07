import { UserPlus } from "lucide-react";
import type { BusinessUserRole } from "@prisma/client";

import { PageHero } from "@prototype/components/page-hero";
import { Button } from "@prototype/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@prototype/components/ui/dialog";
import { EmptyState } from "@prototype/components/ui/empty-state";
import { Input } from "@prototype/components/ui/input";
import { Label } from "@prototype/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@prototype/components/ui/table";
import { Badge } from "@prototype/components/ui/badge";
import { requireBusinessSession } from "@prototype/lib/business";
import { db } from "@prototype/lib/db";

const ROLES: BusinessUserRole[] = ["OWNER", "MANAGER", "STAFF"];

export default async function BusinessTeamPage() {
  const { business, businessId } = await requireBusinessSession();

  if (!business || !businessId) {
    return (
      <>
        <PageHero variant="portal" eyebrow="Business portal" title="Team" description="Invite staff and assign business-specific permissions." />
        <EmptyState title="No business linked to this account" description="Your account isn't attached to a verified business yet." />
      </>
    );
  }

  const [members, invitations] = await Promise.all([
    db.businessUser.findMany({
      where: { businessId },
      include: { user: { select: { name: true, email: true } } },
      orderBy: { createdAt: "asc" }
    }),
    db.businessInvitation.findMany({
      where: { businessId, status: "PENDING" },
      orderBy: { createdAt: "desc" }
    })
  ]);

  async function inviteMember(formData: FormData) {
    "use server";
    const { businessId: activeBusinessId } = await requireBusinessSession();
    if (!activeBusinessId) return;

    const email = String(formData.get("email") ?? "").trim().toLowerCase();
    const role = String(formData.get("role")) as BusinessUserRole;
    if (!email) return;

    await db.businessInvitation.create({
      data: {
        businessId: activeBusinessId,
        email,
        role,
        token: crypto.randomUUID(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
  }

  async function revokeInvitation(formData: FormData) {
    "use server";
    const { businessId: activeBusinessId } = await requireBusinessSession();
    const invitationId = String(formData.get("invitationId"));

    await db.businessInvitation.updateMany({
      where: { id: invitationId, businessId: activeBusinessId ?? undefined },
      data: { status: "REVOKED" }
    });
  }

  async function removeMember(formData: FormData) {
    "use server";
    const { businessId: activeBusinessId } = await requireBusinessSession();
    const businessUserId = String(formData.get("businessUserId"));

    await db.businessUser.deleteMany({ where: { id: businessUserId, businessId: activeBusinessId ?? undefined } });
  }

  return (
    <>
      <PageHero variant="portal" eyebrow="Business portal" title="Team" description="Invite staff and manage who has access to this business." />

      <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">Members</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <UserPlus className="h-4 w-4" />
                  Invite
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite a team member</DialogTitle>
                  <DialogDescription>They&apos;ll join automatically the next time they sign in with this email.</DialogDescription>
                </DialogHeader>
                <form action={inviteMember} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Role</Label>
                    <div className="flex gap-1.5">
                      {ROLES.map((role) => (
                        <label
                          key={role}
                          className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold capitalize transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary"
                        >
                          <input type="radio" name="role" value={role} defaultChecked={role === "STAFF"} className="sr-only" required />
                          {role.toLowerCase()}
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button type="submit" className="mt-1 self-start">
                    Send invite
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {members.length === 0 ? (
            <EmptyState title="No team members yet" description="Invite staff to help manage this business." />
          ) : (
            <div className="rounded-md border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-semibold">{member.user.name ?? "—"}</TableCell>
                    <TableCell>{member.user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        {member.role.toLowerCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.createdAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}</TableCell>
                    <TableCell className="text-right">
                      <form action={removeMember}>
                        <input type="hidden" name="businessUserId" value={member.id} />
                        <Button type="submit" size="sm" variant="secondary">
                          Remove
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          )}

          {invitations.length > 0 ? (
            <>
              <h2 className="mb-3 mt-10 text-lg font-bold">Pending invitations</h2>
              <div className="rounded-md border bg-card overflow-hidden">
            <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Expires</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invitations.map((invitation) => (
                    <TableRow key={invitation.id}>
                      <TableCell>{invitation.email}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {invitation.role.toLowerCase()}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {invitation.expiresAt.toLocaleDateString("en-UG", { dateStyle: "medium" })}
                      </TableCell>
                      <TableCell className="text-right">
                        <form action={revokeInvitation}>
                          <input type="hidden" name="invitationId" value={invitation.id} />
                          <Button type="submit" size="sm" variant="secondary">
                            Revoke
                          </Button>
                        </form>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </div>
            </>
          ) : null}
      </div>
    </>
  );
}
