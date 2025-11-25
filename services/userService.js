const {
  findAllUsers,
  findUserById,
  createUserFromName,
  replaceUserLoans,
  getActiveLoansForUser,
  updateUserRoleById,
  deleteUserById,
} = require('../repositories/userRepo.js');

async function listUsers() {
  return findAllUsers();
}

async function createUserService(name) {
  if (!name) {
    const err = new Error('Field "name" is required');
    err.status = 400;
    throw err;
  }
  return createUserFromName(name);
}

async function setUserBooksCheckedOut(userId, booksCheckedOut) {
  if (!Array.isArray(booksCheckedOut)) {
    const err = new Error('"booksCheckedOut" must be an array of book IDs');
    err.status = 400;
    throw err;
  }

  const id = Number(userId);
  if (Number.isNaN(id)) {
    const err = new Error('Invalid user ID');
    err.status = 400;
    throw err;
  }

  const user = await findUserById(id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const numericBookIds = booksCheckedOut
    .map((b) => Number(b))
    .filter((b) => !Number.isNaN(b));

  const uniqueBookIds = [...new Set(numericBookIds)];

  const finalBookIds = await replaceUserLoans(id, uniqueBookIds);

  return {
    id: user.id,
    name: user.name,
    booksCheckedOut: finalBookIds,
  };
}

async function changeUserRoleService(userId, role) {
  const id = Number(userId);
  if (Number.isNaN(id)) {
    const err = new Error('Invalid user ID');
    err.status = 400;
    throw err;
  }

  if (!['USER', 'ADMIN'].includes(role)) {
    const err = new Error('Role must be either "USER" or "ADMIN"');
    err.status = 400;
    throw err;
  }

  const user = await findUserById(id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  const updated = await updateUserRoleById(id, role);
  const booksCheckedOut = await getActiveLoansForUser(id);

  return {
    id: updated.id,
    name: updated.name,
    booksCheckedOut,
    role: updated.role,
  };
}

async function removeUserService(userId) {
  const id = Number(userId);
  if (Number.isNaN(id)) {
    const err = new Error('Invalid user ID');
    err.status = 400;
    throw err;
  }

  const user = await findUserById(id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }

  await deleteUserById(id);
}

module.exports = {
  listUsers,
  createUserService,
  setUserBooksCheckedOut,
  changeUserRoleService,
  removeUserService
};
