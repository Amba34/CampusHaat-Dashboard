export default function WelcomeHome() {
  return (
    <div className="flex justify-center mt-16">
      <div className="bg-primary-foreground p-8 rounded-lg shadow text-center w-full max-w-xl">
        <h1 className="text-3xl font-bold mb-4">Welcome to Performance Tracker!</h1>
        <p className="text-lg text-muted-foreground mb-2">
          This app helps you visualize and track performance metrics, tasks, and insights in a modern dashboard UI.
        </p>
      </div>
    </div>
  );
}
