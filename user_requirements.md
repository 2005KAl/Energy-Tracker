# User Requirements: Energy-Saving Assistant

## Context
Users want to track and reduce their electricity usage at home. The assistant helps analyze appliance consumption and provides savings insights.

## Input
User manually enters for each appliance:
- Appliance name (string)
- Daily usage hours (number)
- Monthly electricity consumption (kWh)

## Tasks
1. **Calculations for Each Appliance**
   - Daily energy consumption (calculated from monthly)
   - Daily electricity cost
   - Monthly electricity cost
   - Potential savings calculations

2. **Report Generation**
   - For each appliance, display:
     - Appliance name
     - Hours of daily usage
     - Daily consumption (kWh)
     - Monthly consumption (kWh)
     - Daily/monthly costs ($)

3. **Overall Summary**
   - Total daily consumption (kWh)
   - Total monthly consumption (kWh)
   - Total daily cost ($)
   - Total monthly cost ($)

4. **Savings Calculator**
   - Select specific appliance
   - Adjust usage reduction percentage
   - View potential savings:
     - Daily savings ($)
     - Monthly savings ($)
     - Yearly savings ($)

## Output Example

```
Energy Usage Report:

1. Air Conditioner
   Daily Usage: 8 hours
   Daily Consumption: 4.67 kWh
   Monthly Consumption: 140 kWh
   Daily Cost: $0.56
   Monthly Cost: $16.80

Savings Calculator Results:
Selected: Air Conditioner
Reduction: 20%
Potential Savings:
- Daily: $0.11
- Monthly: $3.36
- Yearly: $40.32

Overall Summary:
Total Daily Usage: XX kWh
Total Monthly Usage: XXX kWh
Total Daily Cost: $XX.XX
Total Monthly Cost: $XXX.XX
```

## Requirements
- Simple, user-friendly input form
- Real-time calculations
- Clear display of costs and consumption
- Interactive savings calculator
- Data persistence using localStorage