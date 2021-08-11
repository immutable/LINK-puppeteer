require("dotenv").config();
const { get, click } = require("./puppeteer-better-utils");

const startDepositButtonSelector = "[data-testid=action]";
const connectWalletButton = "[data-testid=wallet-connect]";
const closeWalletButton = "[data-testid=close]";
const listAssetButton = "[data-testid=action]";
const withdrawButton = "[data-testid=action]";

const setupIMXButton = "[data-testid=setup-imx]";
const setupIMXCheckbox = "input";
const finishButton = '[data-testid="wallet-setup-complete"]';

class ImxLinkController {
  browser = null;
  link_env_url = "";

  constructor(browser, link_env_url) {
    this.browser = browser;
    this.link_env_url = link_env_url;
  }

  pickLinkPage = (page) => {
    return page.url().includes(this.link_env_url);
  }

  async getImxLinkPage() {
    await this.browser.waitForTarget(this.pickLinkPage);
    const pages = await this.browser.pages();
    const imxlinkPages = pages.filter(this.pickLinkPage);
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
