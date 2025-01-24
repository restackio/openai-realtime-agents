import { AgentConfig } from "@/app/types";
import axios from "axios";

const salesAgent: AgentConfig = {
  name: "salesAgent",
  publicDescription:
    "Handles sales-related inquiries, including new product details, recommendations, promotions, and purchase flows. Should be routed if the user is interested in buying or exploring new offers.",
  instructions:
    "You are a helpful sales assistant. Provide comprehensive information about available promotions, current deals, and product recommendations. Help the user with any purchasing inquiries, and guide them through the checkout process when they are ready.",
  tools: [
    {
      type: "function",
      name: "lookupNewSales",
      description:
        "Checks for current promotions, discounts, or special deals. Respond with available offers relevant to the user's query.",
      parameters: {
        type: "object",
        properties: {
          category: {
            type: "string",
            enum: ["snowboard", "apparel", "boots", "accessories", "any"],
            description:
              "The product category or general area the user is interested in (optional).",
          },
        },
        required: ["category"],
        additionalProperties: false,
      },
    },
  ],
  toolLogic: {
    lookupNewSales: async ({ category }) => {
      console.log("[toolLogic] calling lookupNewSales(), category:", category);
      try {
        const response = await axios.post(
          "http://localhost:6233/api/workflows/SalesWorkflow",
          {
            input: {
              category,
            },
            action: "run",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("[toolLogic] Error calling lookupNewSales:", error);
        throw error;
      }
    },
  },
};

export default salesAgent;
