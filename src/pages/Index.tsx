interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const Index = () => {
  const contacts: Contact[] = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1 234 567 890" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+1 987 654 321" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", phone: "+1 456 789 012" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Address Book</h1>
          <button className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Add Contact
          </button>
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
                  <button className="text-sm text-primary hover:underline">Edit</button>
                  <button className="text-sm text-destructive hover:underline">Delete</button>
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
