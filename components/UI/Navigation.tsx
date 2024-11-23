"use client";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
export default function Navigation() {
  const router = useRouter();
    const supabase = createClient(); // Create the Supabase client instance

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error during logout:', error.message);
        } else {
            // Clear additional client-side data if needed
            localStorage.removeItem('customUserData'); // Example for custom storage
            // Redirect to the login page or another route
            router.push('/login');
        }
    };
    return (

      
<div className="navbar bg-base-100">
  <div className="flex-1">
  <Image
                src="/Img/logo.png"
                className=""
                alt="logo"
                width={150}
                height={80}
              />
  </div>
  <div className="flex-none gap-2">
    <div className="form-control">
      <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
    </div>  
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-slate-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        
        <li><a className="text-black" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
    );
};
