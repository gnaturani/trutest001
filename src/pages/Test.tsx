const Test = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-center">
          <img
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google Logo"
            className="h-32 w-auto"
          />
        </div>
        <div className="rounded-xl border bg-card p-8 text-center shadow-elegant">
          <h1 className="mb-4 text-3xl font-bold text-foreground">Test Page</h1>
          <p className="mb-4 text-muted-foreground">This is a test page with the Google logo.</p>
          <a href="#/" className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Test;
