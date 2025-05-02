import puppeteer from 'puppeteer';

async function extractInfo(url: string) {
    try {
        // Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        // Create new page
        const page = await browser.newPage();

        // Set viewport
        await page.setViewport({
            width: 1280,
            height: 800
        });

        // Set user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

        // Navigate to URL
        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 30000,
        });

        // Wait for potential Cloudflare challenge to pass
        await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 5000)));

        // Extract information
        const data = await page.evaluate(() => {
            let recipientName = '';
            let courseName = '';

            // Look for recipient name (usually in h1 or strong tags)
            const nameElement = document.querySelector('h1') || document.querySelector('strong');
            if (nameElement) {
                recipientName = nameElement.textContent?.trim() || '';
            }

            // Look for course name (usually in h2 or course link)
            const courseElement = document.querySelector('h2') || document.querySelector('a[href*="/course/"]');
            if (courseElement) {
                courseName = courseElement.textContent?.trim() || '';
            }

            return {
                recipient_name: recipientName,
                course_name: courseName
            };
        });

        // Close browser
        await browser.close();

        return data;
    } catch (error) {
        console.error('Error:', error);
        return {
            recipient_name: '',
            course_name: '',
            error: 'Failed to extract certificate information'
        };
    }
}

// Export for API route usage
export { extractInfo };

// Test usage
extractInfo('https://ude.my/UC-6d9e3418-a8da-43e9-a8ae-2f7cde58eed8')
    .then(data => console.log(JSON.stringify(data, null, 2)))
    .catch(console.error);
