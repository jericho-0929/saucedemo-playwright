# Playwright Automation for Sauce Demo
This repository contains a collection of Playwright automated test scripts developed for the Swag Labs e-commerce site for the Sauce Demo testing platform. 
The scripts were developed in accordance with the user journey prompt of: 
> "As a user, I want to add a product to my cart and complete the checkout process so that I
can successfully purchase the item."

## Test Cases
In accordance with the user journey, the following features were given specific focus for testing:
+ Login
  - Validation of elements 
  - Handling of correct & incorrect credentials input
  - Validation of correct redirection on successful login.
+ Inventory
  - Validation of elements' presence.
  - Validation of redirection to specific product page. 📋
  - Validation of links and buttons being interactable
    + Includes testing if all item's add-to-cart buttons are replaced with remove buttons and vice versa.
+ Cart Page
  - Validate if icon works and return to previous page functionality works.
  - Selecting items from product page and removing them on the cart page.
+ Checkout Process (simulating the user journey)
  - Completion of checkout with just one item.
  - Completion of checkout with multiple items, while removing some midway. 📋
  - Attempting completion of checkout without any items.

Guide: 📋 refers to a test that has no implemented automated test script, as of current commit.
## Test Results
The folder playwright-report contains the generated summary of tests using Playwright's own report features, navigable by accessing the index.html in this repository as GitHub pages was enabled for such purpose.
