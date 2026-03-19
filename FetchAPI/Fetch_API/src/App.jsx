import React, { useState, useEffect } from 'react';

const CommentsTable = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('https://dummyjson.com/comments');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setComments(data.comments);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading comments...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2>Comments Table ({comments.length})</h2>
      
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="flex-column min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likes</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comments.map((comment) => (
              <tr key={comment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comment.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comment.user.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">@{comment.user.username}</td>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                  <p className="truncate">{comment.body}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{comment.postId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span>
                    {comment.likes}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommentsTable;




// import React from "react";

// function App () {
//   // ROle of a JSX in our components

//   // return(
//   //   <div className="App">

//   //     <h1>This is  a React JSX file da deii</h1>
//   //     <p> JSX to js Using the Babel Compiler </p>
//   //   </div>
//   // )
//   return React.createElement('div',{className:'App'},
// React.createElement('h1', null, 'This is  a React JSX file da deii'),
// React.createElement('p', null, 'JSX to js Using the Babel Compiler'))
// }


// export default App;