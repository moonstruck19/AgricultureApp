const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


// Import your models
require('../app/model/user');
require('../app/model/task');
require('../app/model/employee');
require('../app/model/crop');
require('../app/model/animal');
require('../app/model/revenue');
require('../app/model/expense');
require('../app/model/type');

// Initialize mongoose
mongoose.connect('mongodb+srv://lamborghininguyn:G0V7J1wZXC5wDfXi@cluster0.7uvb1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Database connected successfully!");
}).catch((error) => {
  console.error("Database connection error:", error);
});

const startAdminJS = async () => {
  const AdminJS = (await import('adminjs')).default;
  const AdminJSExpress = (await import('@adminjs/express')).default;
  const { Database, Resource } = await import('@adminjs/mongoose');
  const { ComponentLoader } = await import('adminjs');

  const componentLoader = new ComponentLoader();
  const Components = {
    Dashboard: componentLoader.add('Dashboard', path.join(__dirname, '../assets/custom-dashboard')),
  }

  // Register the adapter
  AdminJS.registerAdapter({ Database, Resource });

  // Create AdminJS instance
  const adminJs = new AdminJS({
    resources: [
      { resource: mongoose.model('userInfo'), options: {} },
      { resource: mongoose.model('taskManagerment'), options: {} },
      { resource: mongoose.model('empManagerment'), options: {} },
      { resource: mongoose.model('cropManagerment'), options: {} },
      { resource: mongoose.model('animalManagerment'), options: {} },
      { resource: mongoose.model('revenueMana'), options: {} },
      { resource: mongoose.model('expenseMana'), options: {} },
      { resource: mongoose.model('typeManagerment'), options: {} },
    ],
    rootPath: '/admin',
    dashboard: {
      component: Components.Dashboard,
    },
    ComponentLoader,
    branding: {
      companyName: 'Agriculture Farm',
      logo: 'https://your-logo-url.com/logo.png', // Replace with your logo URL
      theme: {
        colors: {
          primary100: '#0a593c',
          primary80: '#0a593c',
          primary60: '#0a593c',
          primary40: '#0a593c',
          primary20: '#0a593c',
          grey100: '#f0f0f5',
          white: '#ffffff',
        },
      },
    },
  });

  // Create an express app
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());

  // Create AdminJS router
  const adminRouter = AdminJSExpress.buildRouter(adminJs);

  // Use the router in the app
  app.use(adminJs.options.rootPath, adminRouter);

  // Start the app
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`AdminJS is under localhost:${PORT}/admin`);
  });
};

startAdminJS();