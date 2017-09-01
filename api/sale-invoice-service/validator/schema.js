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
                      }

              }
}
module.exports = {
create_invoice_schema: create_invoice_schema

};
