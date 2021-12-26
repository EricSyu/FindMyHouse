# Find My House
A convenient web app for finding house. Automate the daily manual work of searching houses on sale house website. More important thing is avoiding always to see disliked houses that had already seen. 

## Introduction
* Crawl the content of the sale house websites(591,信義房屋) by [house_crawler](https://github.com/EricSyu/house-crawlers) and show on.
* In the page of 房屋清單 tab, show the houses that is selling on the selling house websites. Click the love icon at the first column to move the house to the page of 喜愛清單 tab. Click the trash icon at the last column to move the house to the page of 垃圾桶 tab. 
* In the page of 喜愛清單 tab, provide many options that contain adjusting priority, returning to 房屋清單 and moving to trash. 
* In the page of 垃圾桶 tab, also provide the option that return to 房屋清單. 
* Able to write some comment at the memo column. 
* If the baground color of the house is gray, it means that the house was removed from the sale house website.
* Support the mobile display mode via RWD.

## Technologies Used
* Frond-End: React.js, Bootstrap 3
* Back-End: ASP.Net MVC 5, Entity Framework Core 5
* DB: MySQL
* DevOps tools: Git, Docker, Jenkins, Azure DevOps Services
* Server: Synology NAS DS920+

## Screenshot
### On notebook
![image02](/images/screenshot_notebook_01.png)
![image02](/images/screenshot_notebook_02.png)
![image03](/images/screenshot_notebook_03.png "")

<img src="/images/screenshot_notebook_04.png" width="30%" >

### On mobile
<img src="/images/screenshot_mobile_01.PNG?raw=true" width="30%" > <img src="/images/screenshot_mobile_02.PNG?raw=true" width="30%" > <img src="/images/screenshot_mobile_03.PNG?raw=true" width="30%" >
<img src="/images/screenshot_mobile_04.PNG?raw=true" width="30%" >
