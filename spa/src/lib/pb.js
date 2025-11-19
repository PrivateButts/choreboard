import PocketBase from 'pocketbase'

// Single PocketBase instance shared across the app
const pb = new PocketBase(import.meta.env.VITE_APP_API_URL)

const sharedCache = new Map();

// Cache users to reduce redundant requests
const users = await pb.collection('users').getFullList({
  sort: 'name',
})

pb.collection('users').subscribe('*', function (e) {
  console.debug('Users collection changed:', e);
  (async () => {
    const updatedUsers = await pb.collection('users').getFullList({
      sort: 'name',
    });
    sharedCache.set('users', updatedUsers);
  })();
});

sharedCache.set('users', users);

export default pb
export { sharedCache }
