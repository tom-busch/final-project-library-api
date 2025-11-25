import {
  listUsers,
  createUserService,
  setUserBooksCheckedOut,
  changeUserRoleService,
  removeUserService,
} from '../services/userService.js';

export async function getUsers(req, res, next) {
  try {
    const users = await listUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}

export async function postUser(req, res, next) {
  try {
    const { name } = req.body;
    const user = await createUserService(name);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function putUser(req, res, next) {
  try {
    const { id } = req.params;
    const { booksCheckedOut } = req.body;
    const result = await setUserBooksCheckedOut(id, booksCheckedOut);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function patchUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const result = await changeUserRoleService(id, role);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    await removeUserService(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
