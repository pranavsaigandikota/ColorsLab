const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../public/js/code.js'), 'utf8');
let app;
let xhr;

beforeEach(() => {
  document.body.innerHTML = `
    <input id="loginName"><input id="loginPassword"><span id="loginResult"></span>
    <input id="colorText"><span id="colorAddResult">Previous result</span>
    <input id="searchText"><span id="colorSearchResult"></span><p id="colorList"></p>`;
  xhr = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn()
  };
  app = vm.createContext({ document, window: { location: { href: '' } },
    XMLHttpRequest: jest.fn(() => xhr) });
  vm.runInContext(source, app);
  vm.runInContext('userId = 7;', app);
});

test('addColor sends the entered color and current user as JSON to the PHP API', () => {
  document.getElementById('colorText').value = 'Ocean Blue';
  app.addColor();

  expect(xhr.open).toHaveBeenCalledWith('POST', '/LAMPAPI/AddColor.php', true);
  expect(xhr.setRequestHeader).toHaveBeenCalledWith('Content-type', 'application/json; charset=UTF-8');
  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({ color: 'Ocean Blue', userId: 7 });
  expect(document.getElementById('colorAddResult').textContent).toBe('');

  xhr.readyState = 4;
  xhr.status = 200;
  xhr.onreadystatechange();
  expect(document.getElementById('colorAddResult').textContent).toBe('Color has been added');
});

test('addColor displays request errors', () => {
  xhr.send.mockImplementation(() => { throw new Error('Connection failed'); });
  app.addColor();
  expect(document.getElementById('colorAddResult').textContent).toBe('Connection failed');
});

test('searchColor sends the search and renders each returned color on its own line', () => {
  document.getElementById('searchText').value = 'Blue';
  app.searchColor();

  expect(xhr.open).toHaveBeenCalledWith('POST', '/LAMPAPI/SearchColors.php', true);
  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({ search: 'Blue', userId: 7 });
  xhr.readyState = 4;
  xhr.status = 200;
  xhr.responseText = JSON.stringify({ results: ['Ocean Blue', 'Sky Blue'], error: '' });
  xhr.onreadystatechange();
  expect(document.getElementById('colorList').innerHTML).toBe('Ocean Blue<br>\nSky Blue');
});

test('an invalid login displays an error and stays on the login page', () => {
  document.getElementById('loginName').value = 'unknown';
  document.getElementById('loginPassword').value = 'wrong';
  app.doLogin();

  expect(xhr.open).toHaveBeenCalledWith('POST', '/LAMPAPI/Login.php', true);
  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({ login: 'unknown', password: 'wrong' });
  xhr.readyState = 4;
  xhr.status = 200;
  xhr.responseText = JSON.stringify({ id: 0, firstName: '', lastName: '', error: 'No Records Found' });
  xhr.onreadystatechange();
  expect(document.getElementById('loginResult').textContent).toBe('User/Password combination incorrect');
  expect(app.window.location.href).toBe('');
});
