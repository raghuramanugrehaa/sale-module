var create_invoice_schema = {
    type: 'object',
    properties: {
      Date: {
            type: 'string',
            required: true
        },

            Customer: {
                                  type: "object",
                                  required: true,
                                      properties: {
                                              UID:   {
                                                type: "string",
                                                required:true

                                                      }
                                                  }
                      },

                      Lines: [{
                    type : "object",
                    "required": ["TaxCode", "name"],
                        properties: {
                                Total:   {
                                  type: "string",
                                  required:true

                                },
                                Type:   {
                                  type: "string",
                                  required:true

                                },
                                Description:   {
                                  type: "string",
                                  required:true

                                },

                                TaxCode: {
                                              type: "object",
                                              required:true,
                                              properties: {
                                                            UID: {
                                                                type: 'string',
                                                                  required: true
                                                                  }

                                                          }
                                                        },
                                  Account: {
                                              type: "object",
                                              required:true,
                                              properties: {
                                                            UID: {
                                                                type: 'string',
                                                                  required: true
                                                                  }

                                                          }
                                                        }
                                    }





                      }]

              }
}
module.exports = {
create_invoice_schema: create_invoice_schema

};
