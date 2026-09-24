import nodemailer from 'nodemailer'

const SMTP_USER = 'emscompany2016@gmail.com'
const SMTP_PASS = 'rgrbmcivshpruhdx' // Google App Password
const RECIPIENT_EMAIL = 'ahmadbahaa561@gmail.com'

/**
 * Creates the nodemailer transporter with Gmail SMTP
 */
export function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: true,
    },
  })
}

/**
 * Builds high-deliverability plain-text fallback (crucial for anti-spam scoring)
 */
export function buildPlainTextEmail({ orderNumber, customer, items, totalQuantity, date }) {
  const itemsText = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name}\n   Part Number: ${item.partNumber || 'N/A'}\n   Quantity: ${item.quantity} unit(s)`
    )
    .join('\n\n')

  return `=====================================================
NEW EMS HARDWARE ORDER REQUEST
Order Reference: ${orderNumber}
Date: ${date}
=====================================================

CUSTOMER & DELIVERY INFORMATION:
-----------------------------------------------------
- Full Name: ${customer.firstName || ''} ${customer.lastName || ''}
- Company: ${customer.company || 'Not Specified'}
- Email: ${customer.email || 'N/A'}
- Phone: ${customer.phone || 'N/A'}
- Delivery Address: ${customer.address || 'N/A'}
- Project Notes / PO: ${customer.notes || 'None'}

REQUESTED SIEMENS HARDWARE:
-----------------------------------------------------
${itemsText}

-----------------------------------------------------
TOTAL UNITS REQUESTED: ${totalQuantity} unit(s)
=====================================================
EMS Engineering Management Systems
Siemens Automation & Digitalization Partner
Cairo, Egypt | sales@ems-energy.com
`
}

/**
 * Builds a 100% Static Dark HTML email with guaranteed LIGHT typography.
 *
 * Why this works:
 * 1. Containers use multi-stop directional linear-gradients that mobile Gmail CANNOT invert to white.
 * 2. All text values use high-chroma Ice-White (#E0F2FE: 94% Lightness, 97% Saturation).
 *    Because its saturation is 97%, Gmail iOS's monochrome inversion engine CANNOT invert it to black.
 *    It renders as brilliant, glowing, pristine light text on dark navy.
 * 3. Labels use sophisticated Muted Slate (#8FA4BD) for perfect hierarchy.
 * 4. Accents use Electric Cyan (#38BDF8).
 */
export function buildHtmlEmail({ orderNumber, customer, items, totalQuantity, date }) {
  const customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Valued Client'

  const itemsRows = items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #0E2442;">
        <td style="padding: 14px 18px; vertical-align: middle; background: linear-gradient(180deg, #071528 0%, #061222 100%); background-color: #071528;">
          <div style="color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; font-size: 15px; font-weight: 700; margin-bottom: 5px; line-height: 1.35; letter-spacing: -0.2px;">
            ${item.name}
          </div>
          <div style="font-family: 'Courier New', Courier, monospace; font-size: 12px; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-weight: 500;">
            Part #: <span style="color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-weight: 700;">${item.partNumber || 'N/A'}</span>
          </div>
        </td>
        <td align="center" style="padding: 14px 18px; text-align: center; vertical-align: middle; width: 85px; background: linear-gradient(180deg, #071528 0%, #061222 100%); background-color: #071528;">
          <span style="display: inline-block; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 800;">
            ${item.quantity}
          </span>
        </td>
      </tr>
    `
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="only dark">
  <meta name="supported-color-schemes" content="only dark">
  <title>EMS Order Request — ${orderNumber}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    :root {
      color-scheme: only dark;
      supported-color-schemes: only dark;
    }
    html, body {
      margin: 0 !important;
      padding: 0 !important;
      background-color: #040D1A !important;
      background: linear-gradient(180deg, #040D1A 0%, #071426 100%) !important;
      color: #E0F2FE !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    u + .body {
      background-color: #040D1A !important;
      background: linear-gradient(180deg, #040D1A 0%, #071426 100%) !important;
    }
    /* Prevent blue link formatting on iOS devices */
    a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }
    [data-ogsc] .email-shell { background-color: #040D1A !important; }
    [data-ogsc] .card-container { background-color: #08182E !important; }
  </style>
</head>
<body class="body" bgcolor="#040D1A" style="margin: 0; padding: 0; background-color: #040D1A; background: linear-gradient(180deg, #040D1A 0%, #071426 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #E0F2FE; -webkit-font-smoothing: antialiased;">
  <!-- Outer Canvas -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#040D1A" class="email-shell" style="background-color: #040D1A; background: linear-gradient(180deg, #040D1A 0%, #071426 100%); min-height: 100%; padding: 24px 10px;">
    <tr>
      <td align="center" bgcolor="#040D1A" style="background-color: #040D1A; background: linear-gradient(180deg, #040D1A 0%, #071426 100%);">
        
        <!-- Main Card Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#08182E" class="card-container" style="max-width: 600px; width: 100%; background-color: #08182E; background: linear-gradient(180deg, #091C34 0%, #061426 100%); border: 1.5px solid #143254; border-radius: 18px; overflow: hidden; box-shadow: 0 25px 60px rgba(0, 0, 0, 0.75);">

          <!-- Brand Header -->
          <tr>
            <td bgcolor="#0A2244" style="background-color: #0A2244; background: linear-gradient(90deg, #071B36 0%, #0F325E 50%, #071B36 100%); padding: 24px 26px; border-bottom: 2px solid #0099FF;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 800; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; text-transform: uppercase; letter-spacing: 2px;">
                      EMS ENGINEERING MANAGEMENT SYSTEMS
                    </div>
                    <div style="margin-top: 6px; font-size: 22px; font-weight: 800; color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; letter-spacing: -0.5px; line-height: 1.25;">
                      New Hardware Order Request
                    </div>
                  </td>
                  <td align="right" valign="middle" style="width: 125px;">
                    <!-- Sleek pill badge from photo -->
                    <span style="display: inline-block; background: linear-gradient(135deg, #0A2446 0%, #0E3566 100%); background-color: #0A2446; border: 1.5px solid #0284C7; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 800; padding: 6px 12px; border-radius: 14px; text-align: center; white-space: nowrap; box-shadow: 0 0 10px rgba(2, 132, 199, 0.25);">
                      ${orderNumber}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Summary Strip -->
          <tr>
            <td bgcolor="#041021" style="padding: 13px 26px; background-color: #041021; background: linear-gradient(90deg, #030D1B 0%, #071A33 100%); border-bottom: 1px solid #0F2644;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-size: 12px; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-weight: 500;">
                    Date: <span style="color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; font-weight: 700;">${date}</span>
                  </td>
                  <td align="right" style="font-size: 12px; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important;">
                    Total Hardware Units: <span style="color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-weight: 800; font-size: 15px; font-family: 'Courier New', Courier, monospace;">${totalQuantity}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Information Section -->
          <tr>
            <td style="padding: 24px 24px 10px 24px;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 800; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">
                CUSTOMER &amp; DELIVERY DETAILS
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#061324" style="background-color: #061324; background: linear-gradient(180deg, #071528 0%, #051020 100%); border: 1px solid #132D4E; border-radius: 14px; overflow: hidden;">
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; width: 38%; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-size: 13px; font-weight: 500; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">Full Name</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; font-size: 14px; font-weight: 700; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">${customerName}</td>
                </tr>
                ${customer.company
      ? `
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-size: 13px; font-weight: 500; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">Company / Organization</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; font-size: 14px; font-weight: 700; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">${customer.company}</td>
                </tr>`
      : ''
    }
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-size: 13px; font-weight: 500; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">Work Email</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; font-size: 13px; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">
                    <a href="mailto:${customer.email}" style="color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; text-decoration: none; font-weight: 700;">${customer.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-size: 13px; font-weight: 500; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">Phone / Mobile</td>
                  <td style="padding: 12px 18px; border-bottom: 1px solid #0E2442; font-size: 14px; font-weight: 700; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">
                    <a href="tel:${customer.phone}" style="color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; text-decoration: none; font-weight: 700;">${customer.phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 18px; border-bottom: ${customer.notes ? '1px solid #0E2442' : 'none'}; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-size: 13px; font-weight: 500; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">Delivery Address</td>
                  <td style="padding: 12px 18px; border-bottom: ${customer.notes ? '1px solid #0E2442' : 'none'}; color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; font-size: 13px; font-weight: 600; line-height: 1.45; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">${customer.address}</td>
                </tr>
                ${customer.notes
      ? `
                <tr>
                  <td style="padding: 12px 18px; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-size: 13px; font-weight: 500; vertical-align: top; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">Project Notes / PO</td>
                  <td style="padding: 12px 18px; color: #CBD5E1 !important; -webkit-text-fill-color: #CBD5E1 !important; font-size: 13px; line-height: 1.45; background: linear-gradient(180deg, #071528 0%, #071528 100%); background-color: #071528;">${customer.notes}</td>
                </tr>`
      : ''
    }
              </table>
            </td>
          </tr>

          <!-- Requested Hardware Section -->
          <tr>
            <td style="padding: 18px 24px 24px 24px;">
              <div style="font-family: 'Courier New', Courier, monospace; font-size: 11px; font-weight: 800; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">
                REQUESTED SIEMENS HARDWARE (${items.length} ${items.length === 1 ? 'MODEL' : 'MODELS'})
              </div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#061324" style="background-color: #061324; background: linear-gradient(180deg, #071528 0%, #051020 100%); border: 1px solid #132D4E; border-radius: 14px; overflow: hidden;">
                <thead>
                  <tr bgcolor="#091E38" style="background-color: #091E38; background: linear-gradient(90deg, #091E38 0%, #0D2B4E 100%); border-bottom: 1px solid #132D4E;">
                    <th align="left" style="padding: 12px 18px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-weight: 800; background: linear-gradient(90deg, #091E38 0%, #0D2B4E 100%);">Component Description</th>
                    <th align="center" style="padding: 12px 18px; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-weight: 800; width: 85px; background: linear-gradient(90deg, #091E38 0%, #0D2B4E 100%);">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
                <tfoot>
                  <tr bgcolor="#05101E" style="background-color: #05101E; background: linear-gradient(90deg, #051020 0%, #091F3C 100%); border-top: 1.5px solid #0284C7;">
                    <td style="padding: 14px 18px; font-weight: 800; color: #E0F2FE !important; -webkit-text-fill-color: #E0F2FE !important; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; background: linear-gradient(90deg, #051020 0%, #091F3C 100%);">
                      TOTAL HARDWARE UNITS
                    </td>
                    <td align="center" style="padding: 14px 18px; width: 85px; background: linear-gradient(90deg, #051020 0%, #091F3C 100%);">
                      <span style="display: inline-block; color: #38BDF8 !important; -webkit-text-fill-color: #38BDF8 !important; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 900;">
                        ${totalQuantity}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </td>
          </tr>

          <!-- Quick Action CTA -->
          <tr>
            <td align="center" style="padding: 0 24px 26px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${customer.email}?subject=${encodeURIComponent(`RE: EMS Order Request ${orderNumber}`)}" 
                       style="display: block; width: 100%; box-sizing: border-box; background: linear-gradient(135deg, #0284C7 0%, #0EA5E9 100%); background-color: #0284C7; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; text-decoration: none; font-size: 15px; font-weight: 800; padding: 16px 24px; border-radius: 12px; text-align: center; border: 1.5px solid #38BDF8; box-shadow: 0 10px 25px rgba(2, 132, 199, 0.45);">
                      Reply Directly to Customer<br>
                      <span style="font-size: 12px; font-weight: 600; color: #E0F2FE; opacity: 0.95;">(${customer.email})</span>
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#040D1A" style="padding: 20px 24px; background-color: #040D1A; background: linear-gradient(180deg, #051020 0%, #02070E 100%); border-top: 1px solid #0D1F34; text-align: center; font-size: 11px; color: #64748B; line-height: 1.6;">
              <strong style="color: #8FA4BD !important; -webkit-text-fill-color: #8FA4BD !important; font-size: 12px;">EMS Engineering Management Systems</strong><br>
              Siemens Certified Automation &amp; Digitalization Partner<br>
              Cairo, Egypt &middot; Riyadh, KSA &middot; London, UK<br>
              <span style="font-size: 10px; color: #475569; margin-top: 8px; display: inline-block;">
                This is an automated transactional order request notification generated by the EMS Procurement Portal.
              </span>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Handles sending the order email
 */
export async function sendOrderEmail({ orderNumber, customer, items, totalQuantity, date }) {
  const transporter = createTransporter()

  const customerName = `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Client'
  const subject = `[EMS Order Request] Ref: ${orderNumber} — ${customerName} (${totalQuantity} items)`

  const text = buildPlainTextEmail({ orderNumber, customer, items, totalQuantity, date })
  const html = buildHtmlEmail({ orderNumber, customer, items, totalQuantity, date })

  const mailOptions = {
    from: `"EMS Procurement Portal" <${SMTP_USER}>`,
    to: RECIPIENT_EMAIL,
    replyTo: customer.email ? `"${customerName}" <${customer.email}>` : SMTP_USER,
    subject,
    text,
    html,
    // Anti-spam deliverability headers:
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'High',
      'X-Mailer': 'EMS Procurement Portal v1.0',
      'X-Auto-Response-Suppress': 'OOF, AutoReply',
    },
  }

  const info = await transporter.sendMail(mailOptions)
  return info
}

/**
 * Serverless / Express / Node HTTP request handler
 */
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }))
    return
  }

  try {
    let body = req.body
    if (typeof body === 'string') {
      body = JSON.parse(body)
    } else if (!body) {
      body = await new Promise((resolve, reject) => {
        let raw = ''
        req.on('data', (chunk) => {
          raw += chunk
        })
        req.on('end', () => {
          try {
            resolve(raw ? JSON.parse(raw) : {})
          } catch (e) {
            reject(e)
          }
        })
        req.on('error', reject)
      })
    }

    const { orderNumber, customer, items, totalQuantity, date } = body || {}

    if (!items || !items.length || !customer || !customer.email) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'Missing required order items or customer details.' }))
      return
    }

    const result = await sendOrderEmail({
      orderNumber: orderNumber || `EMS-${Math.floor(100000 + Math.random() * 900000)}`,
      customer,
      items,
      totalQuantity: totalQuantity || items.reduce((sum, item) => sum + (item.quantity || 1), 0),
      date: date || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    })

    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ success: true, messageId: result.messageId }))
  } catch (error) {
    console.error('Failed to send order email:', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: error.message || 'Failed to send email.' }))
  }
}
