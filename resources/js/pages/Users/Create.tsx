import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users Create',
    href: '/users',
  },
];

export default function Create({ roles }) {
  const { data, setData, errors, post } = useForm({
    name: '',
    email: '',
    password: '',
    roles: [],
  });

  function submit(e) {
    e.preventDefault();
    post(route('users.store'));
  }

  function handleCheckboxChange(roleName, checked) {
    if (checked) {
      setData('roles', [...data.roles, roleName]);
    } else {
      setData('roles', data.roles.filter((name) => name !== roleName));
    }
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users Create" />

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
                name="name"
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
                name="email"
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
                name="password"
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
                {roles.map((role) => (
                  <label key={role} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={role}
                      onChange={(e) => handleCheckboxChange(role, e.target.checked)}
                      checked={data.roles.includes(role)}
                      className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded"
                    />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">{role}</span>
                  </label>
                ))}
              </div>
              {errors.roles && <p className="mt-1 text-sm text-red-500">{errors.roles}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </AppLayout>
  );
}
