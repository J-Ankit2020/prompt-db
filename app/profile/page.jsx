'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Profile from '@components/Profile';
import { useRouter } from 'next/navigation';
const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
    // else router.push('/');
  }, [session?.user.id]);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (post) => {
    const isConfirmed = confirm('Are you sure you want to delete this post?');
    if (!isConfirmed) return;
    try {
      const res = await fetch(`/api/prompt/${post._id}`, {
        method: 'DELETE',
      });
      if (res.ok) router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Profile
      name='My'
      desc={`Welcome to your personalized profile page. Share your exceptional prompts and inspire others by the power of your imagination`}
      posts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
