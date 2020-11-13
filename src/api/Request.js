/**
 * A container for requests.
 */
class GenericRequest {
  /**
   * Creates a new instance of GenericRequest.
   *
   * @constructs
   */
  constructor() {
    this.params = {};
  }

  /**
   * Adds the key-value pair to the parameters, or updates the value of the key, if it exists.
   *
   * @param   {String} key      The key of the parameter.
   * @param   {*}      value    The value of the parameter.
   *
   * @returns {GenericRequest}  Returns the working instance of the GenericRequest.
   */
  setParam(key, value) {
    if (!key) throw new Error("The key is invalid.");

    this.params[key] = value;

    return this;
  }

  /**
   * If the condition is met, adds the key-value pair to the parameters, or updates the value of the key, if it exists.
   * In case the condition is not met, does not do anything.
   *
   * @param {String}  key       The key of the parameter.
   * @param {*}       value     The value of the parameter.
   * @param {Boolean} condition If set to false, the parameter will not be added. If no condition is provided, then the value argument will be evaluated.
   *
   * @returns {GenericRequest}  Returns the working instance of the GenericRequest.
   */
  setParamConditional(key, value, condition = undefined) {
    if (condition || (condition === undefined && value))
      this.setParam(key, value);

    return this;
  }

  /**
   * Adds the keys and their corresponding values from the argument to the parameters, or updates the value of the key, if it exists.
   *
   * @param {Object} items      Contains the values to be added to the parameters.
   *
   * @returns {GenericRequest}  Returns the working instance of the GenericRequest.
   */
  setParams(items) {
    for (const key in items) {
      this.setParam(key, items[key]);
    }

    return this;
  }
}

/**
 * A container for POST requests.
 *
 * @extends {GenericRequest}
 */
class PostRequest extends GenericRequest {
  /**
   * Creates a new instance of PostRequest.
   *
   * @param {string}  cacheType   The cache type of the request.
   * @param {String}  contentType The content type of the body.
   * @param {Boolean} keepAlive   Indicates whether the connection must be kept alive or not.
   *
   * @constructs
   */
  constructor(cacheType, contentType, keepAlive) {
    super();

    this.method = "POST";
    this.cacheType = cacheType || "default";
    this.contentType = contentType || "application/json";
    this.keepAlive = keepAlive || false;
  }
}

/**
 * A request for adding new visits.
 *
 * Use setParam(key, value) or setParams(items) to add the following parameters.
 * * email: The email address of the visitor. This field is required.
 * * link: The business link. This field is required.
 * * dummy: If set to true, the business will not be stored in the database.
 * * fname: The first name of the visitor.
 * * lname: The last name of the visitor.
 * * birthday: The birthday of the visitor.
 */
export class AddVisitRequest extends PostRequest {
  /**
   * Creates a new instance of AddVisitRequest.
   * Do not forget to set the appropriate parameters.
   * See *AddVisitRequest* for more details.
   *
   * @param {string}  cacheType   The cache type of the request.
   * @param {String}  contentType The content type of the body.
   * @param {Boolean} keepAlive   Indicates whether the connection must be kept alive or not.
   *
   * @constructs
   */
  constructor(cacheType, contentType, keepAlive) {
    super(cacheType, contentType, keepAlive);

    this.url = "/business/visits/add";
  }
}
