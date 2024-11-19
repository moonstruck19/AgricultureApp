const React = require('react');

const CustomDashboard = async () => {
  const { Box, H1, Text, Illustration, Button } = await import('@adminjs/design-system');

  return React.createElement(
    Box,
    { variant: 'grey', style: { backgroundColor: '#f0f0f5', minHeight: '100vh' } },
    React.createElement(
      Box,
      { variant: 'white', p: 'xxl', style: { borderRadius: '10px', margin: '20px', padding: '40px' } },
      React.createElement(H1, { style: { color: '#0a593c' } }, 'Welcome to the Agriculture Farm Admin Panel'),
      React.createElement(Text, { style: { color: '#333', marginBottom: '20px' } }, 'Manage your farm efficiently with our comprehensive admin panel.'),
      React.createElement(Illustration, { variant: 'plant', width: 200, height: 200 }),
      React.createElement(
        Box,
        { mt: 'xl' },
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/userInfo', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Users'),
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/taskManagerment', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Tasks'),
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/empManagerment', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Employees'),
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/cropManagerment', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Crops'),
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/animalManagerment', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Animals'),
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/revenueMana', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Revenue'),
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/expenseMana', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Expenses'),
        React.createElement(Button, { variant: 'primary', href: '/admin/resources/typeManagerment', style: { backgroundColor: '#0a593c', borderColor: '#0a593c', marginBottom: '10px' } }, 'Manage Types')
      )
    )
  );
};

module.exports = CustomDashboard;