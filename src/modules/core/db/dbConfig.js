import { openDB } from 'idb';
import * as Sentry from '@sentry/browser';

// Database configuration
const DB_NAME = 'eggManagementDB';
const DB_VERSION = 1;

// Store names
export const STORES = {
  PRODUCTION: 'production',
  DISTRIBUTION: 'distribution',
};

// Initialize the IndexedDB database
export async function initializeDB() {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db, oldVersion, newVersion, transaction) {
        console.log(`Upgrading database from version ${oldVersion} to ${newVersion}`);
        
        // Create production store if it doesn't exist
        if (!db.objectStoreNames.contains(STORES.PRODUCTION)) {
          const productionStore = db.createObjectStore(STORES.PRODUCTION, { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          productionStore.createIndex('date', 'date', { unique: false });
          console.log('Created production store');
        }
        
        // Create distribution store if it doesn't exist
        if (!db.objectStoreNames.contains(STORES.DISTRIBUTION)) {
          const distributionStore = db.createObjectStore(STORES.DISTRIBUTION, { 
            keyPath: 'id', 
            autoIncrement: true 
          });
          distributionStore.createIndex('date', 'date', { unique: false });
          console.log('Created distribution store');
        }
      },
      blocked() {
        console.warn('Database upgrade was blocked');
      },
      blocking() {
        console.warn('This connection is blocking a database upgrade');
      },
      terminated() {
        console.error('Database connection was terminated unexpectedly');
      },
    });
    
    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    Sentry.captureException(error);
    throw error;
  }
}

// Get the database instance
export async function getDB() {
  try {
    return await openDB(DB_NAME, DB_VERSION);
  } catch (error) {
    console.error('Error opening database:', error);
    Sentry.captureException(error);
    throw error;
  }
}