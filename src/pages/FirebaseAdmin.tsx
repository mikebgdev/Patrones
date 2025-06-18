import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { InitializeFirestore } from '@/components/initialize-firestore';

export function FirebaseAdmin() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl font-bold">Firebase Admin</h1>
          <InitializeFirestore />
        </div>
      </main>
      <Footer />
    </div>
  );
}
