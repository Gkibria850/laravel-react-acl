import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles Edit',
    href: '/roles',
  },
];

export default function Edit({ role, permissions }) {
  const { data, setData, errors, put } = useForm({
    name: role.name || '',
    permissions: role.permissions.map((p: any) => p.name) || [],
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    put(route('roles.update', role.id));
  }

  function handleCheckboxChange(permissionName: string, checked: boolean) {
    if (checked) {
      setData('permissions', [...data.permissions, permissionName]);
    } else {
      setData('permissions', data.permissions.filter(name => name !== permissionName));
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Roles Edit" />

      <div className="m-4">
        <Link
          href={route('roles.index')}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Back
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-6 rounded-xl p-6 shadow-md bg-white dark:bg-gray-900 w-full max-w-md">
          <form className="space-y-5" onSubmit={submit}>
            {/* Role Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Role Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
                placeholder="Enter role name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Permissions */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Permissions
              </label>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {permissions.map((permission) => (
                  <label key={permission} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={permission}
                      onChange={(e) => handleCheckboxChange(permission, e.target.checked)}
                      checked={data.permissions.includes(permission)}
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">{permission}</span>
                  </label>
                ))}
              </div>
              {errors.permissions && <p className="mt-1 text-sm text-red-500">{errors.permissions}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
