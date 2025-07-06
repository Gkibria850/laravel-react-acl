import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users Edit',
    href: '/users',
  },
];

export default function Edit({
  user,
  userRoles,
  roles,
}: {
  user: any;
  userRoles: string[];
  roles: string[];
}) {
  const { data, setData, errors, put } = useForm({
    name: user.name || '',
    email: user.email || '',
    password: '',
    roles: userRoles || [],
  });

  function handleCheckboxChange(roleName: string, checked: boolean) {
    if (checked) {
      setData('roles', [...data.roles, roleName]);
    } else {
      setData('roles', data.roles.filter((name) => name !== roleName));
    }
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    put(route('users.update', user.id));
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users Edit" />

      <div className="m-4">
        <Link
          href={route('users.index')}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Back
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-6 rounded-xl p-6 shadow-md bg-white dark:bg-gray-900 w-full max-w-md">
          <form className="space-y-5" onSubmit={submit}>
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
                placeholder="Enter your name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
                placeholder="Enter your email"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm shadow-sm"
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {/* Roles */}
            <div>
              <label htmlFor="roles" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Roles
              </label>
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {roles.map((roleName) => (
                  <label key={roleName} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={roleName}
                      onChange={(e) => handleCheckboxChange(roleName, e.target.checked)}
                      checked={data.roles.includes(roleName)}
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">{roleName}</span>
                  </label>
                ))}
              </div>
              {errors.roles && <p className="mt-1 text-sm text-red-500">{errors.roles}</p>}
            </div>

            {/* Submit */}
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
