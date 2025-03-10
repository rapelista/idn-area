import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import { getVillages } from "~/handlers/villages";
import { villageParamsSchema } from "~/schemas/village";
import { mapErrors } from "~/utils";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const validation = villageParamsSchema.safeParse(Object.fromEntries(params));

  if (!validation.success) {
    const errors = mapErrors(validation.error);
    return NextResponse.json({
      errors,
    });
  }

  const { page, limit, search, ...filters } = validation.data;
  const villages = await getVillages();

  /**
   * Filtering
   */
  const filtered = _(villages)
    .filter(({ name }) => {
      return name.toLowerCase().includes(search.toLowerCase());
    })
    .filter(filters)
    .value();

  /**
   * Pagination
   */
  const data = _(filtered)
    .drop((page - 1) * limit)
    .take(limit)
    .value();

  return NextResponse.json({
    data,
    meta: {
      page,
      totalData: filtered.length,
      totalPage: Math.ceil(filtered.length / limit),
    },
  });
}
