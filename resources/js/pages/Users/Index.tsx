import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,Link  } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({users}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
  <Head title="Users" />

  <div className="m-4 ">
    
    <Link 
    href={route('users.create')}
    className="px-4 py-2 text-sm cursor-pointer font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
      Add User
    </Link>
  </div>

  <div className="flex flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto shadow-sm bg-white dark:bg-gray-900">
    <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">ID</th>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Email</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, email }) => (
          <tr
            key={id}
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{id}</td>
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">{email}</td>
            <td className="px-6 py-4 space-x-2">
              <button className="px-3 py-1 text-xs font-medium cursor-pointer text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                Edit
              </button>
              <button className="px-3 py-1 text-xs font-medium cursor-pointer text-white bg-red-600 rounded hover:bg-red-700 transition">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</AppLayout>

    );
}
