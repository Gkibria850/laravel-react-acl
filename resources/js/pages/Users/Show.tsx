import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users Show',
    href: '/users',
  },
];

export default function Show({ user }: { user: any }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Details" />

      <div className="m-4">
        <Link
          href={route('users.index')}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Back
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">User Information</h2>
          
          <div className="space-y-4 text-sm">
            <div>
              <span className="font-medium text-gray-600 dark:text-gray-300">Name:</span>
              <div className="text-gray-900 dark:text-white">{user.name}</div>
            </div>

            <div>
              <span className="font-medium text-gray-600 dark:text-gray-300">Email:</span>
              <div className="text-gray-900 dark:text-white">{user.email}</div>
            </div>

            <div>
              <span className="font-medium text-gray-600 dark:text-gray-300">Created At:</span>
              <div className="text-gray-900 dark:text-white">{user.created_at}</div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
