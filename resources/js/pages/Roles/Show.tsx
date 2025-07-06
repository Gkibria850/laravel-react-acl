import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
  {
    title: 'Role Details',
    href: '#',
  },
];

export default function Show({ role }: { role: any }) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Role Details - ${role.name}`} />

      <div className="m-4">
        <Link
          href={route('roles.index')}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Back
        </Link>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Role Information</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">Below are the details of the role.</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Role Name:</p>
            <p className="text-base text-gray-900 dark:text-white">{role.name}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions:</p>
            <div className="flex flex-wrap gap-2">
              {role.permissions.length > 0 ? (
                role.permissions.map((permission: any) => (
                  <span
                    key={permission.id}
                    className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded dark:bg-green-900 dark:text-green-200"
                  >
                    {permission.name}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No permissions assigned.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
