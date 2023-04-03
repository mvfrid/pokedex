import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Links } from './Links';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Links />);
