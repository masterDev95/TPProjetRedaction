const { Builder, By, Key, until } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
//const queries = require('../../../Back/queries');
const firefoxDriverPath = 'F:\\Cour-Java\\TP-Final\\TPProjetRedaction\\Front2\\geckodriver.exe';

describe('Bibliothèque', () => {
  let driver;

  beforeAll(async () => {
    const serviceBuilder = new firefox.ServiceBuilder(firefoxDriverPath);
    const options = new firefox.Options();
    const firefoxBinaryPath = 'C:\\Program Files\\Mozilla Firefox\\firefox.exe';
    options.setBinary(firefoxBinaryPath);

    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .setFirefoxService(serviceBuilder)
      .build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('Title must be Bibliotheque', async () => {
    await driver.get('http://127.0.0.1:8080/Front2/');
    const title = await driver.getTitle();
    expect(title).toBe('Bibliothèque');
  });
  /*it('Number of cards must be the same than database books', async () => {
    await driver.get('http://127.0.0.1:8080/Front2/');
    const booksCount = await getAllBooks().length;
    const bookCards = await driver.findElements(By.css('.book-card'));
    expect(bookCards.length).toBe(booksCount);
  });*/
});