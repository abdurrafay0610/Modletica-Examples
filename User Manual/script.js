function toggleExpand(SectionName)
{
    var para = document.getElementById(SectionName);
    if(para.style.display === "none")
    {
        para.style.display = "block";
    }
    else
    {
        para.style.display = "none";
    }
}

function toggleVideoExpand(VideoDivId, VideoId, timestamp)
{
    // To open the video div
    toggleExpand(VideoDivId);

    // To Start the video from a specific place
    var videoElement = document.getElementById(VideoId);
    videoElement.currentTime = timestamp;

    // Play the video
    videoElement.play();
}

function openTab(tabName)
{
    /*
     * Function Description: This function will toggle the tab for us.
     * 1) It will close all the other tabs
     * 2) If our tab was already open, it will close it
     * 3) Otherwise, open the tab
     */

    // Declaring some variables
    var flag, i, tabcontent, tablinks;

    // Getting the tab we have clicked on
    var currentTab = document.getElementById(tabName);

    // Checking if the tab is closed or already open
    // If the tab is close, we will set the flag to false
    // If the tab is open, we will set the flag to true
    // flag will be used later on
    if(currentTab.style.display === "none")
    {
        // If the tab is closed
        flag = false;
    }
    else
    {
        // If the tab is open
        flag = true;
    }

    // Closing all the tabs, so they wont overlap
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++)
    {
        tabcontent[i].style.display = "none";
    }

    // If our tab was already open (that is flag was true), we will close the tab
    // Otherwise open the tab
    if(flag === false)
    {
        // Tab was previously closed
        currentTab.style.display = "block";
    }

    // else logic: tab was already open and will be closed is being handled implicitly
}
