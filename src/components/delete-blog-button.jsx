'use client';
import { Button } from './ui/button';

export default function DleteBlogButton({ slug }) {
  return (
    <Button onClick={() => deleteBlog(slug)}>
      Delete Blog
    </Button>
  );
}

function deleteBlog(slug) {
  if (confirm('Are you sure you want to delete this blog?')) {
    fetch(`/api/v1/delete/${slug}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        alert('Blog deleted successfully');
        location.reload();
      } else {
        alert('Failed to delete blog');
      }
    });
  }
}
