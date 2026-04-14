import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const API_BASE = "/api/my/v1";

const Index = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newContact, setNewContact] = useState({ name: "", email: "", phone: "" });
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const queryClient = useQueryClient();

  const { data: contactsData, error: contactsError } = useQuery<{ contacts: Contact[] }>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/contacts-get`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    },
  });

  const contacts = contactsData?.contacts ?? [];

  if (contactsError) {
    console.error("Failed to fetch contacts:", contactsError);
  }

  const addMutation = useMutation({
    mutationFn: async (contact: { name: string; email: string; phone: string }) => {
      const res = await fetch(`${API_BASE}/contacts-add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add contact: ${error.message}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (contact: Contact) => {
      const res = await fetch(`${API_BASE}/contacts-update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact updated successfully");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`${API_BASE}/contacts-delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully");
    },
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.email && newContact.phone) {
      addMutation.mutate(newContact);
      setNewContact({ name: "", email: "", phone: "" });
      setIsAddDialogOpen(false);
    }
  };

  const handleEditClick = (contact: Contact) => {
    setEditingContact(contact);
    setIsEditDialogOpen(true);
  };

  const handleUpdateContact = () => {
    if (editingContact) {
      updateMutation.mutate(editingContact);
      setEditingContact(null);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteContact = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Address Book</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
                  Add Contact
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Contact</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      placeholder="Enter phone"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddContact}>Add Contact</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Contact</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name">Name</Label>
                    <Input
                      id="edit-name"
                      value={editingContact?.name ?? ""}
                      onChange={(e) => setEditingContact(editingContact ? { ...editingContact, name: e.target.value } : null)}
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      value={editingContact?.email ?? ""}
                      onChange={(e) => setEditingContact(editingContact ? { ...editingContact, email: e.target.value } : null)}
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-phone">Phone</Label>
                    <Input
                      id="edit-phone"
                      value={editingContact?.phone ?? ""}
                      onChange={(e) => setEditingContact(editingContact ? { ...editingContact, phone: e.target.value } : null)}
                      placeholder="Enter phone"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleUpdateContact}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>

        <div className="rounded-xl border bg-card shadow-elegant">
          <div className="grid grid-cols-4 gap-4 border-b bg-muted/50 p-4 font-medium">
            <div>Name</div>
            <div>Email</div>
            <div>Phone</div>
            <div>Actions</div>
          </div>

          <div className="divide-y">
            {contacts.map((contact) => (
              <div key={contact.id} className="grid grid-cols-4 gap-4 p-4 hover:bg-muted/30">
                <div className="font-medium text-foreground">{contact.name}</div>
                <div className="text-muted-foreground">{contact.email}</div>
                <div className="text-muted-foreground">{contact.phone}</div>
                <div className="flex gap-2">
                  <button className="text-sm text-primary hover:underline" onClick={() => handleEditClick(contact)}>
                    Edit
                  </button>
                  <button className="text-sm text-destructive hover:underline" onClick={() => handleDeleteContact(contact.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
