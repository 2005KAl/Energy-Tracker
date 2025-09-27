// Global variables
let appliances = [];

// DOM Elements
const applianceForm = document.getElementById('appliance-form');
const appliancesContainer = document.getElementById('appliances-container');
const applianceSelect = document.getElementById('appliance-select');
const usageReduction = document.getElementById('usage-reduction');
const reductionValue = document.getElementById('reduction-value');

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    updateUI();
});

applianceForm.addEventListener('submit', handleManualEntry);
jsonFileInput.addEventListener('change', handleJsonUpload);
usageReduction.addEventListener('input', updateSavingsCalculation);
applianceSelect.addEventListener('change', updateSavingsCalculation);

// Handle Manual Entry
function handleManualEntry(e) {
    e.preventDefault();
    
    const monthlyConsumption = parseFloat(document.getElementById('monthly-consumption').value);
    const dailyHours = parseFloat(document.getElementById('daily-hours').value);
    
    const appliance = {
        name: document.getElementById('appliance-name').value,
        hours: dailyHours,
        monthlyConsumption: monthlyConsumption,
        dailyConsumption: monthlyConsumption / 30 // Calculate daily consumption from monthly
    };

    appliances.push(appliance);
    saveToLocalStorage();
    updateUI();
    applianceForm.reset();
}

// Handle JSON Upload
function handleJsonUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        try {
            const jsonData = JSON.parse(event.target.result);
            appliances = appliances.concat(jsonData);
            saveToLocalStorage();
            updateUI();
        } catch (error) {
            alert('Invalid JSON file format');
        }
    };

    reader.readAsText(file);
}

// Calculate Energy Usage
function calculateMonthlyCost(monthlyConsumption) {
    const averageRate = 0.12; // Average electricity rate per kWh
    return monthlyConsumption * averageRate;
}

function calculateDailyCost(monthlyConsumption) {
    return calculateMonthlyCost(monthlyConsumption) / 30;
}

// Update Savings Calculator
function updateSavingsCalculation() {
    const selectedAppliance = appliances[applianceSelect.value];
    const reductionPercent = parseInt(usageReduction.value);
    reductionValue.textContent = reductionPercent + '%';

    if (selectedAppliance) {
        const currentMonthly = selectedAppliance.monthlyConsumption;
        const reducedMonthly = currentMonthly * (1 - reductionPercent / 100);
        const monthlySavings = calculateMonthlyCost(currentMonthly - reducedMonthly);
        const dailySavings = monthlySavings / 30;
        
        document.getElementById('daily-savings').textContent = dailySavings.toFixed(2);
        document.getElementById('monthly-savings').textContent = monthlySavings.toFixed(2);
        document.getElementById('yearly-savings').textContent = (monthlySavings * 12).toFixed(2);
    }
}

// Update UI
function updateUI() {
    updateAppliancesList();
    updateApplianceSelect();
    updateReport();
}

function updateAppliancesList() {
    appliancesContainer.innerHTML = '';
    appliances.forEach((appliance, index) => {
        const monthlyCost = calculateMonthlyCost(appliance.monthlyConsumption);
        const dailyCost = calculateDailyCost(appliance.monthlyConsumption);

        const card = document.createElement('div');
        card.className = 'appliance-card';
        card.innerHTML = `
            <h3>${appliance.name}</h3>
            <p>Daily Usage: ${appliance.hours} hours</p>
            <p>Daily Consumption: ${appliance.dailyConsumption.toFixed(2)} kWh</p>
            <p>Monthly Consumption: ${appliance.monthlyConsumption.toFixed(2)} kWh</p>
            <p>Daily Cost: $${dailyCost.toFixed(2)}</p>
            <p>Monthly Cost: $${monthlyCost.toFixed(2)}</p>
            <button onclick="removeAppliance(${index})">Remove</button>
        `;
        appliancesContainer.appendChild(card);
    });
}

function updateApplianceSelect() {
    applianceSelect.innerHTML = '<option value="">Select Appliance</option>';
    appliances.forEach((appliance, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = appliance.name;
        applianceSelect.appendChild(option);
    });
}

function updateReport() {
    let totalDailyUsage = 0;
    let totalMonthlyConsumption = 0;

    appliances.forEach(appliance => {
        totalDailyUsage += appliance.dailyConsumption;
        totalMonthlyConsumption += appliance.monthlyConsumption;
    });

    const totalMonthlyCost = calculateMonthlyCost(totalMonthlyConsumption);
    const totalDailyCost = calculateDailyCost(totalMonthlyConsumption);

    document.getElementById('total-daily-usage').textContent = totalDailyUsage.toFixed(2);
    document.getElementById('total-monthly-usage').textContent = totalMonthlyConsumption.toFixed(2);
    document.getElementById('total-daily-cost').textContent = totalDailyCost.toFixed(2);
    document.getElementById('total-monthly-cost').textContent = totalMonthlyCost.toFixed(2);
}

// Local Storage Functions
function saveToLocalStorage() {
    localStorage.setItem('energyTrackerAppliances', JSON.stringify(appliances));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('energyTrackerAppliances');
    if (stored) {
        appliances = JSON.parse(stored);
    }
}

// Remove Appliance
function removeAppliance(index) {
    appliances.splice(index, 1);
    saveToLocalStorage();
    updateUI();
}