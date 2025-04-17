import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          setError("Unauthorized access. Redirecting...");
          setTimeout(() => navigate("/"), 2000); // Wait 2 seconds then redirect
        }
      } catch (error) {
        setError("Couldn't get user.");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (!user) {
    return <div className="text-center py-10 text-gray-600">{error || "Loading profile..."}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-md mt-8">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-6">
        <img
          src={user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
          alt="User Avatar"
          className="w-32 h-32 rounded-full object-cover border-4 border-blue-300"
        />
        <div className="mt-4 sm:mt-0 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-blue-800 mb-1">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.telephone}</p>
        </div>
      </div>
        <Button className="mt-5" asChild>
            <Link to="/update-profile">Update Profile</Link>
        </Button>
    </div>
  );
};

export default Profile;
