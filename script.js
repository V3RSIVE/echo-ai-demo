// Truist AI Virtual Assistant Demo
// Main JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    const chatBody = document.getElementById('chat-body');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const quickActionButtons = document.querySelectorAll('.quick-action-button');
    
    // Predefined responses based on user queries
    const responses = {
        'balance': {
            text: "Your current checking account balance is $3,542.18. Your savings account balance is $12,875.65. Would you like to see your recent transactions?",
            followUp: "I can also help you set up balance alerts or provide tips on how to grow your savings."
        },
        'transaction': {
            text: "Here are your recent transactions:\n- Grocery Store: $78.52 (yesterday)\n- Coffee Shop: $4.75 (yesterday)\n- Online Purchase: $32.99 (2 days ago)\n- Restaurant: $45.67 (3 days ago)",
            insight: {
                title: "Spending Insight",
                text: "Your dining expenses are 12% lower this month compared to last month. Great job managing your budget!"
            }
        },
        'loan': {
            text: "Based on your profile, you may qualify for the following loan options:\n\n1. Personal Loan: Up to $25,000 at 5.99% APR\n2. Home Equity Line: Up to $100,000 at 4.25% APR\n3. Auto Loan: Up to $35,000 at 3.49% APR",
            followUp: "Would you like me to help you start a loan application or calculate potential monthly payments?"
        },
        'mortgage': {
            text: "Current mortgage rates at Truist:\n- 30-year fixed: 3.25% APR\n- 15-year fixed: 2.75% APR\n- 5/1 ARM: 2.80% APR\n\nBased on your profile, you might qualify for our first-time homebuyer program with special rates.",
            followUp: "I can connect you with a mortgage specialist or help you calculate how much home you can afford."
        },
        'insight': {
            text: "Based on your spending patterns over the last 3 months, I've noticed:\n\n- You're spending 15% more on dining out compared to previous months\n- Your utility bills have decreased by 8%\n- You've been consistent with your savings goals",
            recommendation: {
                title: "Personalized Recommendation",
                text: "Consider setting up automatic transfers of $200 monthly to your savings account to reach your vacation goal by December."
            }
        },
        'budget': {
            text: "Looking at your spending patterns, here are some budgeting recommendations:\n\n1. Consider allocating 50% of income to necessities\n2. Aim for 30% to discretionary spending\n3. Target 20% for savings and debt repayment",
            insight: {
                title: "Budget Insight",
                text: "You're currently allocating 35% to discretionary spending. Reducing this by 5% could help you reach your savings goals faster."
            }
        },
        'invest': {
            text: "Based on your risk profile and financial goals, here are some investment options to consider:\n\n1. Truist Balanced Growth Portfolio\n2. Tax-advantaged retirement accounts\n3. Diversified ETF strategy",
            followUp: "Would you like to schedule a consultation with a Truist financial advisor to discuss these options in detail?"
        },
        'help': {
            text: "I can help you with:\n- Checking account balances\n- Reviewing recent transactions\n- Providing spending insights\n- Offering budgeting advice\n- Exploring loan options\n- Answering questions about Truist services",
            followUp: "What would you like assistance with today?"
        },
        'default': {
            text: "I'm here to help with your banking needs. You can ask me about your accounts, transactions, loans, budgeting advice, or financial insights.",
            followUp: "How can I assist you today?"
        }
    };
    
    // Welcome messages to display in sequence
    const welcomeMessages = [
        "Hello! I'm your Truist Virtual Assistant. How can I help you today with your banking needs?",
        "I notice it's been 3 days since your last login. Your checking account has received a deposit of $1,250.00 from Direct Deposit."
    ];
    
    // Display initial welcome message
    addMessage(welcomeMessages[0], false);
    
    // Display second welcome message after a delay
    setTimeout(() => {
        addMessage(welcomeMessages[1], false);
    }, 1500);
    
    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'assistant'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Handle newlines in the content
        const formattedContent = content.replace(/\n/g, '<br>');
        messageContent.innerHTML = formattedContent;
        
        messageDiv.appendChild(messageContent);
        chatBody.appendChild(messageDiv);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Function to add an insight card
    function addInsightCard(title, content) {
        const insightDiv = document.createElement('div');
        insightDiv.className = 'message assistant';
        
        const insightContent = document.createElement('div');
        insightContent.className = 'message-content';
        
        const insightCard = document.createElement('div');
        insightCard.className = 'financial-insight';
        
        const insightHeader = document.createElement('div');
        insightHeader.className = 'financial-insight-header';
        
        const insightIcon = document.createElement('span');
        insightIcon.className = 'financial-insight-icon';
        insightIcon.innerHTML = '💡';
        
        const insightTitle = document.createElement('span');
        insightTitle.className = 'financial-insight-title';
        insightTitle.textContent = title;
        
        const insightText = document.createElement('div');
        insightText.className = 'financial-insight-content';
        insightText.textContent = content;
        
        insightHeader.appendChild(insightIcon);
        insightHeader.appendChild(insightTitle);
        
        insightCard.appendChild(insightHeader);
        insightCard.appendChild(insightText);
        
        insightContent.appendChild(insightCard);
        insightDiv.appendChild(insightContent);
        
        chatBody.appendChild(insightDiv);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message assistant';
        typingDiv.id = 'typing-indicator';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingContent.appendChild(dot);
        }
        
        typingDiv.appendChild(typingContent);
        chatBody.appendChild(typingDiv);
        
        // Scroll to bottom
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to get response based on user input
    function getResponse(input) {
        input = input.toLowerCase();
        
        if (input.includes('balance') || input.includes('how much') || input.includes('account')) {
            return responses.balance;
        } else if (input.includes('transaction') || input.includes('purchase') || input.includes('spending') || input.includes('spent')) {
            return responses.transaction;
        } else if (input.includes('loan') || input.includes('borrow')) {
            return responses.loan;
        } else if (input.includes('mortgage') || input.includes('home loan') || input.includes('house')) {
            return responses.mortgage;
        } else if (input.includes('insight') || input.includes('analyze') || input.includes('pattern')) {
            return responses.insight;
        } else if (input.includes('budget') || input.includes('save') || input.includes('saving')) {
            return responses.budget;
        } else if (input.includes('invest') || input.includes('investment') || input.includes('stock')) {
            return responses.invest;
        } else if (input.includes('help') || input.includes('assist') || input.includes('support')) {
            return responses.help;
        } else {
            return responses.default;
        }
    }
    
    // Function to handle user input
    function handleUserInput() {
        const userMessage = userInput.value.trim();
        
        if (userMessage === '') return;
        
        // Add user message to chat
        addMessage(userMessage, true);
        
        // Clear input field
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI processing time
        setTimeout(() => {
            // Remove typing indicator
            removeTypingIndicator();
            
            // Get AI response
            const responseObj = getResponse(userMessage);
            
            // Add main response
            addMessage(responseObj.text);
            
            // If there's an insight, add it after a delay
            if (responseObj.insight) {
                setTimeout(() => {
                    addInsightCard(responseObj.insight.title, responseObj.insight.text);
                }, 1000);
            }
            
            // If there's a recommendation, add it after a delay
            if (responseObj.recommendation) {
                setTimeout(() => {
                    addInsightCard(responseObj.recommendation.title, responseObj.recommendation.text);
                }, 1000);
            }
            
            // If there's a follow-up, add it after a delay
            if (responseObj.followUp) {
                setTimeout(() => {
                    addMessage(responseObj.followUp);
                }, responseObj.insight || responseObj.recommendation ? 2000 : 1000);
            }
            
        }, 1000);
    }
    
    // Event listeners
    sendButton.addEventListener('click', handleUserInput);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    // Quick action buttons
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            userInput.value = buttonText;
            handleUserInput();
        });
    });
});
