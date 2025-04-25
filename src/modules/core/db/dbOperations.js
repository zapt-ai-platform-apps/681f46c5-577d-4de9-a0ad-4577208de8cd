import { getDB, STORES } from './dbConfig';
import * as Sentry from '@sentry/browser';

// Generic function to add an item to a store
export async function addItem(storeName, item) {
  try {
    const db = await getDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const id = await store.add(item);
    await tx.done;
    console.log(`Added item to ${storeName}:`, item);
    return id;
  } catch (error) {
    console.error(`Error adding item to ${storeName}:`, error);
    Sentry.captureException(error);
    throw error;
  }
}

// Generic function to get all items from a store
export async function getAllItems(storeName) {
  try {
    const db = await getDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const items = await store.getAll();
    await tx.done;
    console.log(`Retrieved all items from ${storeName}:`, items);
    return items;
  } catch (error) {
    console.error(`Error getting all items from ${storeName}:`, error);
    Sentry.captureException(error);
    throw error;
  }
}

// Get items from a store for a specific date range
export async function getItemsByDateRange(storeName, startDate, endDate) {
  try {
    const db = await getDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const index = store.index('date');
    
    // Convert to IDB range: need timestamp format for proper comparison
    const range = IDBKeyRange.bound(
      startDate.toISOString(),
      endDate.toISOString()
    );
    
    const items = await index.getAll(range);
    await tx.done;
    console.log(`Retrieved items from ${storeName} for date range:`, items);
    return items;
  } catch (error) {
    console.error(`Error getting items by date range from ${storeName}:`, error);
    Sentry.captureException(error);
    throw error;
  }
}

// Update an item in a store
export async function updateItem(storeName, item) {
  try {
    const db = await getDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.put(item);
    await tx.done;
    console.log(`Updated item in ${storeName}:`, item);
    return item;
  } catch (error) {
    console.error(`Error updating item in ${storeName}:`, error);
    Sentry.captureException(error);
    throw error;
  }
}

// Delete an item from a store
export async function deleteItem(storeName, id) {
  try {
    const db = await getDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(id);
    await tx.done;
    console.log(`Deleted item with id ${id} from ${storeName}`);
    return true;
  } catch (error) {
    console.error(`Error deleting item from ${storeName}:`, error);
    Sentry.captureException(error);
    throw error;
  }
}