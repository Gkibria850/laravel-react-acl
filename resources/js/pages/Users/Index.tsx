import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head,Link,router  } from '@inertiajs/react';
import { can } from '@/lib/can';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

export default function Index({users}) {

  function handleDelete(id) {
  if (confirm('Are you sure you want to delete this user?')) {
    router.delete(route('users.destroy', id));
  }
}
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
  <Head title="Users" />

  <div className="m-4 ">
    
    {can('users.create') && <Link 
    href={route('users.create')}
    className="px-4 py-2 text-sm cursor-pointer font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 transition">
      Add User
    </Link>}
  </div>

  <div className="flex flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto shadow-sm bg-white dark:bg-gray-900">
    <table className="min-w-full text-sm text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow">
      <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3">ID</th>
          <th scope="col" className="px-6 py-3">Name</th>
          <th scope="col" className="px-6 py-3">Email</th>
          <th scope="col" className="px-6 py-3">Roles</th>
          <th scope="col" className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ id, name, email,roles }) => (
          <tr
            key={id}
            className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{id}</td>
            <td className="px-6 py-4">{name}</td>
            <td className="px-6 py-4">{email}</td>
             <td className="px-6 py-4">{roles.map((role)=>
                <span 
                key="1"
                className='mr-1 bg-green-10 text-green-800 text-xs font-medium'>{role.name}</span>
                )}
            </td>
            <td className="px-6 py-4 space-x-2">
               {can('users.show') && <Link  href={route('users.show',id)}
              className="px-3 py-1 text-xs font-medium cursor-pointer text-white bg-yellow-500 rounded hover:bg-yellow-700 transition">
                Show
              </Link>}
               {can('users.edit') &&
              <Link  href={route('users.edit',id)}
              className="px-3 py-1 text-xs font-medium cursor-pointer text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                Edit
              </Link>}
             {can('users.delete') && 
              <button
                onClick={() => handleDelete(id)}
                className="px-3 py-1 text-xs font-medium cursor-pointer text-white bg-red-600 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</AppLayout>

    );
}