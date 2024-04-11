const express = require('express');
const cors = require('cors');
const app = express();
const puppeteer = require('puppeteer');
app.use(express.static('public'));
app.use(cors());
app.set('view engine', 'ejs');

// Render the template with dynamic data
app.get('/', (req, res) => {
    const data = {
        title: "Report",
        intro: { // PDF First Page the iogo sponsor section
          planedOnDate: 'Planted on Dec 22nd, 2024',
          title: 'Hero Motocorp Forest',
          address: 'Near Chengalpet Toll, Kolathoor, Chennai, Tamil Nadu',
          reportOnDate: 'Report for January 2024',
          sponsorLogo: '',
          coSponsors: ["", "", "", ""]
        },
        overViewCard: { // PDF secound section
          treePlantedCount: "1,00,000",
          varietiesCount: '50',
          manHours: '650',
          rainyDaysCount: '03',
          outOfDays: '365',
          carbonSequesteredTon: '30k',
          emissions: '600',
          oxygenReleased: '30k',
          cylinders: '5000',
          liters: '10'
        },
        plantSpecificInfo: { // PDF third section
          minHeight: '1.5',
          maxHeight: '3',
          insideForest: '20',
          outsideForest: '27',
          soilColorName: 'Black red soil',
          soilColor: 10, //0 - 230 (0 - 100) - 2.3 one unit
          plantColorName: "Greenish",
          plantColor: "#59CA00"
        },
        googleEarth: [ //googleEarth photos
          {
            imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
            date: 'Feb 01, 2024',
            tag: "tag1"
          },
          {
            imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
            date: 'Feb 01, 2024',
            tag: "tag2"
          },
          {
            imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
            date: 'Feb 01, 2024',
            tag: "tag3"
          },
        ],
        gallery: [ // photos gallery
          {
            imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
            date: 'Feb 01, 2024',
            tag: "tag1"
          },
          {
            imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
            date: 'Feb 01, 2024',
            tag: "tag2"
          },
          {
            imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
            date: 'Feb 01, 2024',
            tag: "tag3"
          },
        ],
        plantsTableData: { //Plants count
          columnNames: ['Week 1 (Jan 1 - 6)', 'Week 2 (Jan 7 - 13)', 'Week 3 (Jan 14 - 20)', 'Week 4 (Jan 14 - 20)', 'Week 5 (Jan 14 - 20)',],
          rows: [
            {
              title: "Plants alive",
              values: ["1,00,000", "99,998", "99,002", "98,850", "97,000"]
            },
            {
              title: "Plants dead",
              values: ["0", "2", "98", "52", "150"]
            },
            {
              title: "Plants replaced",
              values: ["0", "0", "2", "0", "50"]
            }
          ],
      
        },
        circleChartValue: { // we have donut chart this circleChartValue  refer in figma : Top 5 trees (Tree distribution)
          data: ["12", "19", "3", "4", "5"],
          plantNames: ["Neem", "Mangos", "Cocunut", "Tamirind", "Banyan"]
        },
        circleData: [  //refer in figma : Top 5 trees (Tree distribution) have small table
          { name: "Neem", percentage: "25%", count: "25,000" },
          { name: "Mango", percentage: "25%", count: "25,000" },
          { name: "Coconut", percentage: "25%", count: "25,000" },
          { name: "Tamarind", percentage: "25%", count: "25,000" },
          { name: "Banyan", percentage: "15%", count: "25,000" }
        ],
        wateringTabledata: {
          columnNames: ['Week 1 (Jan 1 - 6)', 'Week 2 (Jan 7 - 13)', 'Week 3 (Jan 14 - 20)', 'Week 4 (Jan 14 - 20)', 'Week 5 (Jan 14 - 20)'],
          rows: [
            {
              title: "Watering of plants",
              weeks: ["Maria Anders", "Germany", "Germany", "Germany", "Germany"]
            },
            {
              title: "Rain days",
              weeks: ["Francisco Chang", "Mexico", "Mexico", "Mexico", "Mexico"]
            }
          ],
          comments: [
            {
              comment1: "Sed ut Watering unde omnis iste natus error sit voluptatem",
              date1: 'On 02 Feb, 2024 at 11:00 AM',
            },
            {
              comment2: 'Sed ut Watering unde omnis iste natus error sit voluptatem',
              date2: "On 02 Feb, 2024 at 11:00 AM"
            }
          ],
          cards: [
            {
              imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/485/200/200.jpg?hmac=7ho6uS1u-Lmj8IR2V6-nJaiAVicTYT7bNcnzCMRwEG4',
              date: 'Feb 01, 2024',
            },
          ]
        },
        activitiesTableData: {
          columnNames: ['Week 1 (Jan 1 - 6)', 'Week 2 (Jan 7 - 13)', 'Week 3 (Jan 14 - 20)', 'Week 4 (Jan 14 - 20)', 'Week 5 (Jan 14 - 20)',],
          rows: [
            { title: "Weed removal", hours: ["-", "-", "-", "36 hrs (2 ppl/2 days)", "-"] },
            { title: "Site clean-up", hours: ["-", "36 hrs (2 ppl/2 days)", "-", "-", "-"] }
          ],
      
          activities: [
            {
              activityTitle: "Weed removals",
              cards: [
                {
                  imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
                  date: 'Feb 01, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
                  date: 'Feb 01, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
                  date: 'Feb 01, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/485/200/200.jpg?hmac=7ho6uS1u-Lmj8IR2V6-nJaiAVicTYT7bNcnzCMRwEG4',
                  date: 'Feb 01, 2024',
                },
              ],
              comments: [
                {
                  text: "Sed ut activities unde omnis iste natus error sit voluptatem",
                  date: 'On 02 Feb, 2024 at 11:00 AM',
                },
                {
                  text: 'Sed ut activities unde omnis iste natus error sit voluptatem',
                  date: "On 02 Feb, 2024 at 11:00 AM"
                }
              ],
            },
            {
              activityTitle: "Site clean-up",
              cards: [
                {
                  imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
                  date: 'Feb 01, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
                  date: 'Feb 02, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
                  date: 'Feb 03, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/485/200/200.jpg?hmac=7ho6uS1u-Lmj8IR2V6-nJaiAVicTYT7bNcnzCMRwEG4',
                  date: 'Feb 04, 2024',
                },
              ],
              comments: [
                {
                  text: "Sed ut Site clean-up unde omnis iste natus error sit voluptatem",
                  date: 'On 02 Feb, 2024 at 11:00 AM',
                },
                {
                  text: 'Sed ut Site clean-up unde omnis iste natus error sit voluptatem',
                  date: "On 02 Feb, 2024 at 11:00 AM"
                }
              ],
            },
            {
              activityTitle: "clean-up",
              cards: [
                {
                  imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
                  date: 'Feb 01, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
                  date: 'Feb 02, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
                  date: 'Feb 03, 2024',
                },
                {
                  imageSrc: 'https://fastly.picsum.photos/id/485/200/200.jpg?hmac=7ho6uS1u-Lmj8IR2V6-nJaiAVicTYT7bNcnzCMRwEG4',
                  date: 'Feb 04, 2024',
                },
              ],
              comments: [
                {
                  text: "Sed ut Site clean-up unde omnis iste natus error sit voluptatem",
                  date: 'On 02 Feb, 2024 at 11:00 AM',
                },
                {
                  text: 'Sed ut Site clean-up unde omnis iste natus error sit voluptatem',
                  date: "On 02 Feb, 2024 at 11:00 AM"
                }
              ],
            }
          ]
        },
        amenitiesTableData: {
          columnNames: ['Week 1 (Jan 1 - 6)', 'Week 2 (Jan 7 - 13)', 'Week 3 (Jan 14 - 20)', 'Week 4 (Jan 14 - 20)', 'Week 5 (Jan 14 - 20)'],
          rows: [
            { title: "Fencing", working: ['yes', 'no', 'yes', 'yes', 'no'], notWorking: ['no', 'no', 'no', 'no', 'no'] },
            { title: "Boards", working: ['yes', 'yes', 'yes', 'yes', 'no'], notWorking: ['yes', 'no', 'no', 'no', 'no'] },
            { title: "Pipeline", working: ['no', 'no', 'yes', 'yes', 'no'], notWorking: ['no', 'no', 'no', 'no', 'no'] },
            { title: "Electricity", working: ['yes', 'no', 'no', 'no', 'no'], notWorking: ['no', 'yes', 'no', 'yes', 'yes'] },
            { title: "Lights", working: ['yes', 'no', 'yes', 'no', 'no'], notWorking: ['no', 'no', 'no', 'yes', 'yes'] },
            { title: "Buckets", working: ['yes', 'no', 'no', 'no', 'no'], notWorking: ['no', 'no', 'no', 'yes', 'no'] }
          ],
          comments: [
            {
              comment1: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
              date1: 'On 02 Feb, 2024 at 11:00 AM',
            },
            {
              comment2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
              date2: "On 02 Feb, 2024 at 11:00 AM"
            }
          ],
          cards: [
            {
              imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/485/200/200.jpg?hmac=7ho6uS1u-Lmj8IR2V6-nJaiAVicTYT7bNcnzCMRwEG4',
              date: 'Feb 01, 2024',
            },
          ]
        },
        attendanceTableData: {
          columnNames: ['Week 1 (Jan 1 - 6)', 'Week 2 (Jan 7 - 13)', 'Week 3 (Jan 14 - 20)', 'Week 4 (Jan 14 - 20)', 'Week 5 (Jan 14 - 20)',],
      
          rows: [
            {
              title: "Supervisor attendance",
              attendance: ["4/6 days", "4/6 days", "4/6 days", "4/6 days", "4/6 days"]
            }],
        },
        biodiversityData: {
      
          comments: [
            {
              comment1: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
              date1: 'On 02 Feb, 2024 at 11:00 AM',
            },
            {
              comment2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
              date2: "On 02 Feb, 2024 at 11:00 AM"
            }
          ],
          cards: [
            {
              imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/485/200/200.jpg?hmac=7ho6uS1u-Lmj8IR2V6-nJaiAVicTYT7bNcnzCMRwEG4',
              date: 'Feb 01, 2024',
            },
          ],
          tag: ["Tag04", "Tag05", "Tag06"]
        },
        visitorData: {
      
          comments: [
            {
              comment1: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem",
              date1: 'On 02 Feb, 2024 at 11:00 AM',
            },
            {
              comment2: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem',
              date2: "On 02 Feb, 2024 at 11:00 AM"
            }
          ],
          cards: [
            {
              imageSrc: 'https://fastly.picsum.photos/id/484/200/200.jpg?hmac=3rqhoyJTHVOGelhVPMaglcnpAMl_V3cvNkHZDpSz6_g',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/295/200/200.jpg?hmac=nsWHMt5f11TALPFeS_0t6tIlO2CkViBNAbAbSlhu8P4',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/649/200/200.jpg?hmac=tj148mYv7Me5ctSyCePc_TNjma4W3n3RwnqJcIogLoI',
              date: 'Feb 01, 2024',
            },
            {
              imageSrc: 'https://fastly.picsum.photos/id/485/200/200.jpg?hmac=7ho6uS1u-Lmj8IR2V6-nJaiAVicTYT7bNcnzCMRwEG4',
              date: 'Feb 01, 2024',
            },
          ],
        },
        report_data_color: "#748E63;", // first half of pdf have this color
        lineChartValue: { // we have line chart table refer figma cumulativeData
          labels: ["2022", "2023", "2024"],
          treePlanted: ["65", "59", "80"],
          treeDead: ["20", "11", "36"],
          treeReplaced: ["56", "65", "70"],
        },
        cumulativeAmenitiesTableData: {
          columnNames: ['2022', "2023", '2024'],
      
          rows: [
            { title: 'Fencing', working2022: '44 times', notWorking2022: '12 times', working2023: '12 times', notWorking2023: '12 times', working2024: '44 times', notWorking2024: '12 times' },
            { title: 'Boards', working2022: '44 times', notWorking2022: '12 times', working2023: '12 times', notWorking2023: '12 times', working2024: '44 times', notWorking2024: '12 times' },
            { title: 'Pipeline', working2022: '44 times', notWorking2022: '12 times', working2023: '12 times', notWorking2023: '12 times', working2024: '44 times', notWorking2024: '12 times' },
            { title: 'Electricity', working2022: '44 times', notWorking2022: '12 times', working2023: '12 times', notWorking2023: '12 times', working2024: '44 times', notWorking2024: '12 times' },
            { title: 'Lights', working2022: '44 times', notWorking2022: '12 times', working2023: '12 times', notWorking2023: '12 times', working2024: '44 times', notWorking2024: '12 times' },
            { title: 'Buckets', working2022: '44 times', notWorking2022: '12 times', working2023: '12 times', notWorking2023: '12 times', working2024: '44 times', notWorking2024: '12 times' },
      
          ]
        },
        cumulativeActivitesTableData: {
          columnNames: ['2022', "2023", '2024'],
      
          rows: [
            {
              title: "Weed removal", hours: ["400 hrs (2 ppl/2 days)", "400 hrs (2 ppl/2 days)", "400 hrs (2 ppl/2 days)"]
            },
            {
              title: "Site clean-up", hours: ["400 hrs (2 ppl/2 days)", "400 hrs (2 ppl/2 days)", "400 hrs (2 ppl/2 days)"]
            },
          ]
        },
        cumulativeWateringTabledata: {
          columnNames: ['2022', "2023", '2024'],
      
          rows: [
            {
              title: "Watering of plants",
              weeks: ["300/365 days", "300/365 days", "300/365 days",]
            },
            {
              title: "Rain days",
              weeks: ["300/365 days", "300/365 days", "300/365 days",]
            }
          ]
        },
        cumulativeAttendanceTableData: {
          columnNames: ['2022', "2023", '2024'],
      
          rows: [
            {
              title: "Supervisor attendance",
              attendance: ["300/365 days", "300/365 days", "300/365 days",]
            },
          ]
        },
        forestDetails: { // input from text editor eg : "<p>.....</p>"
          note1: '1',
          note2: '2',
          note3: '3',
          note4: '4',
      
        },
        cumulative_data_color: " #805D3A;",// secound half of pdf have this color which is cumulative data section
      }
    res.render('template', data);
});
// need to share with varadhaman
app.get('/api/generatePDF', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        // Set viewport size to mimic a large laptop
        await page.setViewport({ width: 1440, height: 800 });

        // Log the viewport size after setting it
        const viewportSize = page.viewport();
        console.log('Viewport size set to:', viewportSize);
        // Navigate to the HTML content endpoint
        await page.goto('http://localhost:4000', { waitUntil: ['domcontentloaded', 'networkidle2'] })
        // await page.waitForTimeout(2000); 
        // Generate PDF from the rendered HTML
        // await page.emulateMedia('screen');
        // await page.setViewport({ width: 1680, height: 1050 });
        // await page.setViewport({width: 1080, height: 1024})
        // await page.emulateMediaType('screen');
        // const pdf = await page.pdf({ format: 'A4' });
        // await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 0.8 });
        // margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
        // path: 'result.pdf',
        const pdf = await page.pdf({
            printBackground: true,
            // landscape: true,
            format: 'A4',
            deviceScaleFactor: 0.54
        });
        // Close the browser
        await browser.close();

        // Set response headers to trigger download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="generated-pdf.pdf"');

        // Send the PDF as response
        res.send(pdf);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});

app.get('/api/getPDF', async (req, res) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Set viewport size to mimic a large laptop
        await page.setViewport({ width: 1440, height: 800 });

        // Navigate to the HTML content endpoint
        await page.goto('http://localhost:4000', { waitUntil: ['domcontentloaded', 'networkidle2'] });

        // Generate PDF from the rendered HTML
        const pdf = await page.pdf({
            printBackground: true,
            format: 'A4',
            deviceScaleFactor: 0.54
        });

        // Close the browser
        await browser.close();

        // Set response headers for PDF content
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline'); // Display in browser instead of triggering a download

        // Send the PDF content as response
        res.send(pdf);
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).send('Error generating PDF');
    }
});



// Start the server
const port = 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
