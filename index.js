require("dotenv").config();
const { get, click } = require("./puppeteer-better-utils");

const imxlinkBaseURL = process.env.LINK_ADDRESSS;

const startDepositButtonSelector = 'button[data-testid="action"]';
const connectWalletButton = 'button[data-testid="wallet-connect"]';
const closeWalletButton = 'button[data-testid="close"]';
const listAssetButton = 'button[data-testid="action"]';
const withdrawButton = 'button[data-testid="action"]';

const setupIMXButton = 'button[data-testid="setup-imx"]';
const setupIMXCheckbox = "input";
const finishButton = 'button[data-testid="wallet-setup-complete"]';

class ImxLinkController {
  browser = null;

  constructor(browser) {
    this.browser = browser;
  }

  async getImxLinkPage() {
    await this.browser.waitForTarget((target) =>
      target.url().startsWith(imxlinkBaseURL)
    );

    const pages = await this.browser.pages();
    pages.map((p) => console.log(p));
    const imxlinkPages = pages.filter((p) =>
      p.url().startsWith(imxlinkBaseURL)
    );
    console.log("imxlinkPages", imxlinkPages);
    console.assert(imxlinkPages.length === 1, "Couldn't find IMX Link page!");

    const imxLinkPage = imxlinkPages[0];

    return imxLinkPage;
  }

  async listAsset() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, listAssetButton);
    await click(linkpage, listAssetButton);
  }

  async startWithdraw() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, withdrawButton);
    await click(linkpage, withdrawButton);
  }

  async startDeposit() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, startDepositButtonSelector);
    await click(linkpage, startDepositButtonSelector);
  }

  async selectWallet() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, connectWalletButton);
    await click(linkpage, connectWalletButton);
  }

  async closeWallet() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, closeWalletButton);
    await click(linkpage, closeWalletButton);
  }

  async close() {
    const linkpage = await this.getImxLinkPage();
    linkpage.close();
  }

  async setupIMXKey() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, setupIMXCheckbox);
    await click(linkpage, setupIMXCheckbox);
    await get(linkpage, setupIMXCheckbox);
    await click(linkpage, setupIMXButton);
  }

  async connectWallet() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, connectWalletButton);
    await click(linkpage, connectWalletButton);
  }

  async selectFinish() {
    const linkpage = await this.getImxLinkPage();
    await get(linkpage, finishButton);
    await click(linkpage, finishButton);
  }
}

module.exports = { ImxLinkController };
